import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createjob } from "../services/opreation/jobAPI";
import type { AppDispatch } from "../redux/store";
import { FooterPage } from "../components/main/Footer";

type jonInput = {
  company: string;
  role: string;
  status: string;
  notes: string;
};

export const CreateJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: any) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<jonInput>();

  const onSubmit = async (data: jonInput) => {
    const { company, role, status, notes } = data;
    await dispatch(createjob({ company, role, status, notes, navigate, token }));
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col px-4">
      <main className="flex-grow flex justify-center items-start mt-5">
        <div className="bg-[#272727] w-full max-w-md rounded-md shadow-md p-6">
          <h1 className="text-center text-xl font-semibold font-mono text-white mb-6">
            Add New Job
          </h1>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">
                Company Name:
              </label>
              <input
                type="text"
                placeholder="Enter your company"
                className="bg-[#393838] p-2 rounded-sm text-white"
                {...register("company", { required: true })}
              />
              {errors.company && (
                <span className="text-red-400 text-sm">This field is required</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Job Role:</label>
              <input
                type="text"
                placeholder="Job Role"
                className="bg-[#393838] p-2 rounded-sm text-white"
                {...register("role", { required: true })}
              />
              {errors.role && (
                <span className="text-red-400 text-sm">This field is required</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Select Status:</label>
              <select
                className="bg-[#393838] p-2 rounded-sm text-white"
                {...register("status", { required: true })}
              >
                <option value="">Select</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
                <option>Accepted</option>
              </select>
              {errors.status && (
                <span className="text-red-400 text-sm">Please select a status</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">
                Write Key Note Related to Job:
              </label>
              <textarea
                placeholder="Write here.."
                className="bg-[#393838] p-2 rounded-sm text-white"
                rows={4}
                {...register("notes")}
              />
              {errors.notes && (
                <span className="text-red-400 text-sm">Write about your job</span>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Create Job
            </button>
          </form>
        </div>
      </main>

      <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/home">
          <button className="bg-[#272727] text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all">
            Go Home
          </button>
        </Link>
        <Link to="/dashboard/view-jobs">
          <button className="bg-[#272727] text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all">
            View Jobs
          </button>
        </Link>
      </div>

      <FooterPage />
    </div>
  );
};
