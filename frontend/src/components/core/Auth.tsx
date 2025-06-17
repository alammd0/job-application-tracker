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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandlers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (type === "signup") {
      await dispatch(signup({ name, email, password, navigate }));
    } else {
      await dispatch(login({ email, password, navigate }));
    }
  };

  return (
    <div className="bg-[#f7dcdc] w-[90%] max-w-md mx-auto mt-16 p-6 rounded-md shadow-md shadow-gray-700">
      <h1 className="text-center text-black text-xl font-semibold font-mono mb-6">
        Hello, Welcome to Authentication
      </h1>

      <form onSubmit={submitHandlers} className="flex flex-col gap-6">
        {type !== "login" && (
          <FormControl fullWidth>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Enter Your Name"
            />
          </FormControl>
        )}

        <FormControl fullWidth>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter Your Email"
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Enter Your Password"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          className="!bg-black !text-white hover:!bg-gray-800"
        >
          {type === "signup" ? "Signup" : "Login"}
        </Button>

        <div className="text-center text-black text-sm font-semibold">
          <Link to={type === "signup" ? "/login" : "/signup"}>
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span className="text-blue-500 underline">
              {type === "signup" ? "Login" : "Signup"}
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
