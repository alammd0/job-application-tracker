import type { AppDispatch } from "../../redux/store";
import { apiconnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { setUser, setToken, setLoading } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const { SIGNUP_API, LOGIN_APi, GETUSER_API } = authEndpoints;

interface SignupParam {
  name: string;
  email: string;
  password: string;
}

interface LoginParam {
  email: string;
  password: string;
  navigate: (path: string) => void;
}

// ------------------ SIGNUP ------------------
export const signup = ({ name, email, password }: SignupParam) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Please wait...");
    dispatch(setLoading(true));

    try {
      const response = await apiconnector({
        method: "POST",
        url: SIGNUP_API,
        data: { name, email, password },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response || !response.data) {
        throw new Error("Signup failed. No response data.");
      }

      dispatch(setUser(response.data.data));
      toast.dismiss(toastId)
      toast.success("Signup successful toastId");
    } catch (error: any) {
      console.error("Signup Error:", error?.message || error);
      toast.dismiss(toastId);
      toast.error("Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ------------------ LOGIN ------------------
export const login = ({ email, password, navigate }: LoginParam) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiconnector({
        method: "POST",
        url: LOGIN_APi,
        data: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response || !response.data) {
        throw new Error("Login failed. No response data.");
      }

      const token = response.data.token;
      const user = response.data.data;

      // Save to Redux
      dispatch(setUser(user));
      dispatch(setToken(token));

      // Optional: Save to localStorage
      localStorage.setItem("token", token);
      toast.dismiss(toastId);
      toast.success("Login successful");
      navigate("/home");
    } catch (error: any) {
      console.error("Login Error:", error?.message || error);
      toast.dismiss(toastId);
      toast.error("Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ------------------ GET USER ------------------
export const getuser = () => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Fetching user...");
    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await apiconnector({
        method: "GET",
        url: GETUSER_API,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response || !response.data) {
        throw new Error("User not found");
      }

      dispatch(setUser(response.data));
      toast.dismiss(toastId);
      toast.success("User data fetched");
      return response.data;

    } catch (error: any) {
      console.error("Get User Error:", error?.message || error);
      toast.dismiss(toastId);
      toast.error("Failed to get user");
    } finally {
      dispatch(setLoading(false));
    }
  };
};
