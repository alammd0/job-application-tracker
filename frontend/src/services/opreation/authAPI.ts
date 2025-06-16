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
  navigate: (path: string) => void;
}

interface LoginParam {
  email: string;
  password: string;
  navigate: (path: string) => void;
}

// ------------------ SIGNUP ------------------
export const signup = ({ name, email, password, navigate }: SignupParam) => {
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

      toast.success("Signup successful toastId" , {toastId});
      navigate("/login");
    } catch (error: any) {
      console.error("Signup Error:", error?.message || error);
      toast.error("Signup failed", { toastId });
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

      toast.success("Login successful", { toastId });
      navigate("/home");
    } catch (error: any) {
      console.error("Login Error:", error?.message || error);
      toast.error("Login failed", { toastId });
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
      toast.success("User data fetched", { toastId });

      return response.data;
    } catch (error: any) {
      console.error("Get User Error:", error?.message || error);
      toast.error("Failed to get user", { toastId });
    } finally {
      dispatch(setLoading(false));
    }
  };
};
