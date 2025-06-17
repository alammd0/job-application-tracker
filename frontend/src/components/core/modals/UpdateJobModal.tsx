import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { updatejob } from "../../../services/opreation/jobAPI";

interface Job {
  id: string;
  company: string;
  role: string;
  status: string;
  notes?: string;
  appliedDate?: string;
}

interface JobUpdateModalProps {
  onClose: () => void;
  job: Job | null;
  jobId: string;
}

const JobUpdateModal: React.FC<JobUpdateModalProps> = ({
  onClose,
  job,
  jobId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: job?.company || "",
      role: job?.role || "",
      status: job?.status || "",
      notes: job?.notes || "",
      appliedDate: job?.appliedDate || "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);

  // Reset form when job changes
  React.useEffect(() => {
    reset({
      company: job?.company || "",
      role: job?.role || "",
      status: job?.status || "",
      notes: job?.notes || "",
      appliedDate: job?.appliedDate || "",
    });
  }, [job, reset]);

  const onSubmit = async (data: any) => {
    if (job) {
      const { company, role, status, notes } = data;
      await dispatch(
        updatejob({
          jobId,
          company,
          status,
          role,
          notes,
          navigate,
          token,
        })
      );
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-[#272727] p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className=" flex flex-col gap-2">
            <label className="text-[18px] font-semibold font-mono text-gray-300">
              Company Name:{" "}
            </label>
            <input
              type="text"
              placeholder="Enter your company"
              className="bg-[#393838] p-2 rounded-sm capitalize"
              {...register("company", { required: true })}
            ></input>
            {errors.company && <span>This field is required</span>}
          </div>

          <div className=" flex flex-col gap-2">
            <label className="text-[18px] font-semibold font-mono text-gray-300">
              Job Role:{" "}
            </label>
            <input
              type="text"
              placeholder="Job Role"
              className="bg-[#393838] p-2 rounded-sm capitalize"
              {...register("role", { required: true })}
            ></input>
            {errors.role && <span>This field is required</span>}
          </div>

          <div className=" flex flex-col gap-2">
            <label className="text-[18px] font-semibold font-mono text-gray-300">
              Select Status:{" "}
            </label>
            <select
              className="bg-[#393838] p-2 rounded-sm capitalize"
              {...register("status")}
            >
              <option>Select</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Accepted</option>
            </select>
            {errors.status && <span>Please select Status</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[18px] font-semibold font-mono text-gray-300">
              Write Key Note Relate Job:{" "}
            </label>
            <textarea
              placeholder="Write here.."
              {...register("notes")}
              className="w-full bg-[#393838] p-2 rounded-sm"
              rows={4}
            ></textarea>
            {errors.notes && <span>Write about your job</span>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#a9a3a3] text-gray-900 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#030359] text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobUpdateModal;
