import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../../services/opreation/authAPI";

interface typeProps {
  type: string;
}

export const AuthForm = ({ type }: typeProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandlers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    const { name, email, password } = formData;

    if (type === "signup") {
      await dispatch(signup({ name, email, password, navigate }));
    } else {
      await dispatch(login({ email, password, navigate }));
    }
  };

  return (
    <div className="bg-[#f7dcdc] w-[450px] mx-auto mt-16 rounded-md shadow-2xs shadow-gray-700">
      <h1 className="text-center text-black px-2 py-4 text-xl font-semibold font-mono">
        Hello Welcome Your Authentication
      </h1>

      <form onSubmit={submitHandlers} className="flex flex-col gap-7 px-5 py-7">
        {type !== "login" && (
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Enter Your Name"
            />
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter Your Email"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Enter Your Password"
          />
        </FormControl>

        <Button type="submit"> {type === "signup" ? "Signup" : "Login"}</Button>

        <div className="text-center text-black text-[14px] font-semibold">
          <Link to={type === "signup" ? "/login" : "/signup"}>
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span className="text-blue-500">
              {type == "signup" ? "Login" : "Singup"}
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
