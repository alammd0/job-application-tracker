import { toast } from "react-toastify";
import type { AppDispatch } from "../../redux/store";
import { jobEndpoints } from "../apis";
import { createJobSchema } from "@mkadevs/zodvalidation";
import { apiconnector } from "../apiconnector";
import { setLoading } from "../../redux/slices/authSlice";
import { setJobs, setSelectedJob } from "../../redux/slices/JobSlice";

const {
  CREATE_JOB_API,
  UPDATE_JOB_API,
  GET_ALL_JOB_API,
  GET_JOB_DETAILS_API,
  DELETE_JOB_API,
} = jobEndpoints;

const getToken = () => localStorage.getItem("token");

// ---------- Create Job ----------
interface CreateJobParam {
  company: string;
  status: string;
  role: string;
  notes: string;
  navigate: (path: string) => void;
  token: string;
}

export const createjob = ({
  company,
  status,
  role,
  notes,
  navigate,
  token,
}: CreateJobParam) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Creating job...");
    dispatch(setLoading(true));

    try {
      const validatedData = createJobSchema.parse({
        company,
        status,
        role,
        notes,
      });

      const response = await apiconnector({
        method: "POST",
        url: CREATE_JOB_API,
        data: validatedData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      dispatch(setJobs(response.data));

      toast.dismiss(toastId);
      toast.success("Job Created Successfully");
      navigate("/dashboard/view-jobs");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create job");
      toast.dismiss(toastId);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ---------- Update Job ----------
interface UpdateJobParam extends CreateJobParam {
  jobId: string;
}

export const updatejob = ({
  jobId,
  company,
  status,
  role,
  notes,
  navigate,
  token
}: UpdateJobParam) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Updating job...");
    dispatch(setLoading(true));

    try {
      const validatedData = createJobSchema.parse({
        company,
        status,
        role,
        notes,
      });

      const response = await apiconnector({
        method: "PUT",
        url: `${UPDATE_JOB_API}/${jobId}`,
        data: validatedData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Inside Update Job - ", response.data);
      dispatch(updatejob(response.data));
      toast.dismiss(toastId);
      toast.success("Job Updated Successfully");
      navigate("/home")
    } catch (error: any) {
      toast.error(error?.message || "Failed to update job", { toastId });
      toast.dismiss(toastId);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};


// ---------- Get All Jobs ----------
export const getAllJobs = ({ token }: { token: string }) => {
  return async (dispatch: AppDispatch) => {

    // console.log(token);
    dispatch(setLoading(true));
    try {
      // console.log(token);
      const response = await apiconnector({
        method: "GET",
        url: GET_ALL_JOB_API,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      dispatch(setJobs(response));
      return response;
    } catch (error: any) {
      toast.error("Failed to fetch jobs");
      return [];
    } finally {
      dispatch(setLoading(false));
    }
  };
};


// ---------- Get Job Details ----------
export const getJobDetails = (jobId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiconnector({
        method: "GET",
        url: `${GET_JOB_DETAILS_API}/${jobId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      dispatch(setSelectedJob(response.data));
      return response.data || null;
    } catch (error: any) {
      toast.error("Failed to get job details");
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ---------- Delete Job ----------

interface jobDelete {
  jobId : string,
  navigate : (path : string) => void
}

export const deleteJob = ({jobId, navigate} : jobDelete) => {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Deleting job...");
    dispatch(setLoading(true));

    try {
      const response = await apiconnector({
        method: "DELETE",
        url: `${DELETE_JOB_API}/${jobId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log(response);
      toast.dismiss(toastId);
      toast.success("Job Deleted Successfully");
      navigate("/home");
    } catch (error: any) {
      toast.error("Failed to delete job");
      toast.dismiss(toastId);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
