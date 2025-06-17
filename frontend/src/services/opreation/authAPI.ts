import type { AppDispatch } from "../../redux/store";
import { apiconnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { setUser, setToken, setLoading } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { setJobs } from "../../redux/slices/JobSlice";

const { SIGNUP_API, LOGIN_APi, GETUSER_API, DELETE_USER_API } = authEndpoints;

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
      toast.dismiss(toastId);
      toast.success("Signup successful toastId");
      navigate("/login");
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

      // console.log("Login response - ", response.token);

      if (!response || !response.data) {
        throw new Error("Login failed. No response data.");
      }

      const token = response.token;
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
export const getuser = ({ token }: { token: string }) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Fetching user...");
    dispatch(setLoading(true));

    try {
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
      toast.success("User data fetched");
      return response.data;
    } catch (error: any) {
      console.error("Get User Error:", error?.message || error);
      toast.error("Failed to get user");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

// ------------------- LOGOUT User --------------
export const logout = (navigate: any) => {
  return async (dispatch: any) => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/");
  };
};

// ------------------ DELETE USER ---------------

interface deleteProps {
  token : string,
  navigate : (path : string) => void
}

export const deleteuser = ({ token, navigate}: deleteProps) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Please wait...");
    dispatch(setLoading(true));

    try {
      const response = await apiconnector({
        method: "DELETE",
        url: DELETE_USER_API,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Delete user - ", response);

      if (!response) {
        throw new Error("User deletion failed");
      }

      toast.success("User deleted successfully");

      // Optional: Logout user or reset user state
      dispatch(setUser(null));
      dispatch(setJobs([]));
      navigate("/")

      return response.data;
    } catch (err: any) {
      console.error("Delete User Error:", err?.message || err);
      toast.error("Failed to delete user");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
