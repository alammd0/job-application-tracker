const prisma = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginSchema, signupSchema } = require("@mkadevs/zodvalidation");
const dotenv = require("dotenv");
const { SignupTemplate } = require("../utils/templates/signupTemplate");
const { sendMail } = require("../utils/sendEmail");
const { LoginTemplate } = require("../utils/templates/loginTemplate");
dotenv.config();

const signup = async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);

    // check
    if (!parsed.success) {
      return res.status(404).json({
        success: false,
        error: parsed.error.errors,
        message: "Zod Validation Error, Check user Data",
      });
    }

    // destructure valid Data
    const { name, email, password } = parsed.data;

    // check user exit or not means existing User
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check
    if (existingUser) {
      return res.status(501).json({
        success: false,
        message: "User Exist, Please Login",
      });
    }

    // hashed The password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hased password...", hashedPassword);

    // create user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const HTMLtemplate = SignupTemplate({
      name: newUser.name,
      email: newUser.email,
    });

    await sendMail({
      to: newUser.email,
      subject: "Signup Successfully.., Next You Login",
      html: HTMLtemplate,
    });

    //finally return response
    return res.status(200).json({
      success: true,
      message: "Signup Successfully..",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "Signup Failed, Please Check..",
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    // console.log("Zod - ", parsed);

    if (!parsed.success) {
      return res.status(404).json({
        success: false,
        error: parsed.error.errors,
        message: "Zod Validation Error, Check user Data",
      });
    }

    const { email, password } = parsed.data;

    // check presents or not
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found, Please Signup",
      });
    }

    // console.log("user exits", existingUser);

    // here compare password
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(505).json({
        success: false,
        message: "Password Incorrect, Please Check",
      });
    }

    existingUser.password = undefined;

    // generate token using JWT
    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const HTMLtemplate = LoginTemplate({
      name: existingUser.name,
      loginTime: existingUser.createAt,
    });

    await sendMail({
      to: existingUser.email,
      subject: "Your Are Login, Search Yours Related JobS",
      html: HTMLtemplate,
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: false,
        message: "User Login Successfully",
        data: existingUser,
        token: token,
      });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "User Credentials is wrongs",
    });
  }
};

// get user details
const getuser = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User id not Fetch",
      });
    }

    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        password: false,
        jobs: true,
        role: true,
      },
    });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found...",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Details Here..",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      success: false,
      message: "User Not Found This error find getuser function",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("user id inside delete controllers - ", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "userId not fetch...",
      });
    }

    const deleteproperty = await prisma.job.deleteMany({
      where: {
        userId: userId,
      },
    });

    // console.log("Delete Property - ", deleteproperty);

    const deleteuser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // console.log("Delete User - ", deleteUser);

    return res.status(200).json({
      success: true,
      message: "User Delete successfully...",
    });
  } catch (err) {
    return res.status(502).json({
      success: false,
      message: "User deleting error...",
    });
  }
};

module.exports = { signup, login, getuser, deleteUser };
