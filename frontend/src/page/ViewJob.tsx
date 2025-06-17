import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../services/opreation/jobAPI";
import type { AppDispatch } from "../redux/store";
import { formatDate } from "../utils/formatDate";

type Job = {
  company: string;
  createjob: string;
  appliedDate: string;
  status: string;
  role: string;
  note: string;
  // add other fields as needed
};

export const ViewJobs = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      setloading(true);
      if (token) {
        const resp = await dispatch(getAllJobs({ token }));
        setAllJobs(resp.data);
      }
      setloading(false);
    };

    getJobs();
  }, [token]);

  if (loading) {
    return <div className="loader w-9/12 mx-auto mt-4"></div>;
  }

  return (
    <div className="w-9/12 mx-auto">
      <div className="flex flex-col gap-7 px-5 py-7">
        {allJobs.length === 0 ? (
          <div>
            <p>No Job Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            {allJobs.map((job, index) => (
              <div
                key={index}
                className="bg-[#272727] px-5 py-7 shadow-2xs shadow-gray-700 rounded-md flex flex-col gap-3"
              >
                <div className="flex justify-between">
                  <p className="text-2xl font-semibold font-mono">
                    {job.company}
                  </p>
                  <p className="text-[14px] font-display">
                    {formatDate(job.appliedDate)}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className=" font-mono text-gray-300">
                    <b>Status:</b> {job.status}
                  </p>
                  <p>Role : {job.role}</p>
                  <p>Job Description : {job.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
