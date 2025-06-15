const prisma = require("../utils/db");
const { createJobSchema } = require("@mkadevs/zodvalidation");
const { JobgenerateEmailTemplate } = require("../utils/templates/jonTemplate");
const { sendMail } = require("../utils/sendEmail");
const { JobRemoveEmailTemplate } = require("../utils/templates/jobremovetemplate");

const updateJobSchema = createJobSchema.partial();

// Add Job Details
const addJob = async (req, res) => {
  try {
    const parsed = createJobSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(204).json({
        success: false,
        message: "Any Content Issue, Zod Error",
      });
    }

    const { company, role, status, notes } = parsed.data;

    const userId = req.user.id;
    // console.log(userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User id not Fetch",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found...",
      });
    }

    const createJob = await prisma.job.create({
      data: {
        company: company,
        role: role,
        status: status,
        note: notes,
        userId: user.id,
      },
    });

    // send email for user
    const jobhtmlTemplate = JobgenerateEmailTemplate({
      name: user.name,
      jobRole: role,
      company: company,
      actionType: status,
      status: status,
      note: notes,
    });

    await sendMail({
      to: user.email,
      subject: "Job Created",
      html: jobhtmlTemplate,
    });

    return res.status(200).json({
      success: true,
      message: "Job Create SuccessFully...",
      data: createJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      success: false,
      message: "Job Create Error, Please Check...",
    });
  }
};

// Edit Job Details
const editJob = async (req, res) => {
  try {
    const parsed = updateJobSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(304).json({
        success: false,
        message: "Zod Error, check",
      });
    }

    const { company, role, status, notes } = parsed.data;

    // find JobId from parameter
    const jobId = req.params.id;
    console.log("Job Id - ", jobId);

    const updateJob = await prisma.job.update({
      where: {
        id: Number(jobId),
      },
      data: {
        company: company,
        role: role,
        status: status,
        note: notes,
      },
    });

    if (!updateJob) {
      return res.status(304).json({
        success: false,
        message: "Job details Update Failed",
      });
    }

    const userId = req.user.id;
    // console.log(userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User id not Fetch",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found...",
      });
    }

    // before send response send mail user
    const updateHTMLtemplate = JobgenerateEmailTemplate({
      name: user.name,
      jobRole: updateJob.role,
      company: updateJob.company,
      actionType: updateJob.status,
      status: updateJob.status,
      note: updateJob.note,
    });

    await sendMail({
      to: user.email,
      subject: "Job Updated",
      html: updateHTMLtemplate,
    });

    return res.status(200).json({
      success: true,
      message: "Update Job Successfully...",
      data: updateJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(304).json({
      success: false,
      message: "Job Update Error, Please Check...",
    });
  }
};

// view Job Details(All) also Used filter/sort
const getAllJob = async (req, res) => {
  try {
    const getallsjobs = await prisma.job.findMany({});

    if (!getallsjobs) {
      return res.status(404).json({
        success: false,
        message: "No Jobs Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Jobs Are Fetched",
      data: getallsjobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Get all Jobs Error, please check...",
    });
  }
};

// View Job Details by Id
const getjobdetailsById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const findJobDetails = await prisma.job.findFirst({
      where: {
        id: Number(jobId),
      },
    });

    if (!findJobDetails) {
      return res.status(404).json({
        success: false,
        message: "Job Details Not Found given Job Id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job Details are There...",
      data: findJobDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Get Jobs details failed, please check...",
    });
  }
};

// Delete Jobs
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const findJobDetails = await prisma.job.findFirst({
      where: {
        id: Number(jobId),
      },
    });

    const deleteJobs = await prisma.job.delete({
        where : {
            id : Number(jobId)
        }
    })

    const userId = req.user.id;
    // console.log(userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User id not Fetch",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found...",
      });
    }

    // before send response send mail user
    const deleteHTMLtemplate = JobRemoveEmailTemplate({
      name: user.name,
      jobRole: deleteJobs.role,
      company: deleteJobs.company
    });

    await sendMail({
      to: user.email,
      subject: "Job Removed from Tracker",
      html: deleteHTMLtemplate,
    });

    return res.status(200).json({
        success : true,
        message : "Job Remove Successfully"
    })

  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "Job delete error, Please gain.",
    });
  }
};

module.exports = { addJob, editJob, getAllJob, deleteJob, getjobdetailsById };
