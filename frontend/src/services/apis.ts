import { BACKEND_URL } from "./backendURl";

// auth endPoints
export const authEndpoints = {
  SIGNUP_API: `${BACKEND_URL}/api/v1/auth/signup`,
  LOGIN_APi: `${BACKEND_URL}/api/v1/auth/login`,
  GETUSER_API: `${BACKEND_URL}/api/v1/auth/get-user`,
};

// Job End Points
export const jobEndpoints = {
  CREATE_JOB_API: `${BACKEND_URL}/api/v1/job/create-job`,
  UPDATE_JOB_API: `${BACKEND_URL}/api/v1/job/update-job`,
  GET_ALL_JOB_API: `${BACKEND_URL}/api/v1/job/get-all-jobs`,
  GET_JOB_DETAILS_API: `${BACKEND_URL}/api/v1/job/job-details`,
  DELETE_JOB_API: `${BACKEND_URL}/api/v1/job/delete-job`,
};
