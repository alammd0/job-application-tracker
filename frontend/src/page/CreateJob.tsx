import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createjob } from "../services/opreation/jobAPI";
import type { AppDispatch } from "../redux/store";

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
    console.log("Form Data:", data);
    const {company, role, status, notes} = data ;

    await dispatch(createjob({
        company, status, role, notes, navigate, token
    }));

    reset();
  };

  return (
    <div className="bg-[#272727] w-[450px] mx-auto rounded-md shadow-2xs shadow-gray-700">
      <div>
        <h1 className="text-center pt-4 text-xl font-semibold font-mono text-white">
          Add New Job
        </h1>

        <form
          className="flex flex-col gap-7 px-5 py-7"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <select  className="bg-[#393838] p-2 rounded-sm capitalize" {...register("status")}>
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

          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};
