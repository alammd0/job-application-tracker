import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../services/opreation/jobAPI";
import type { AppDispatch } from "../redux/store";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { FooterPage } from "../components/main/Footer";

type Job = {
  company: string;
  createjob: string;
  appliedDate: string;
  status: string;
  role: string;
  note: string;
};

export const ViewJobs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      if (token) {
        const resp = await dispatch(getAllJobs({ token }));
        setAllJobs(resp.data);
      }
      setLoading(false);
    };
    getJobs();
  }, [token]);

  if (loading) {
    return (
      <div className="loader w-9/12 mx-auto mt-4 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">All Jobs</h1>
          <p className="text-gray-400 text-sm">
            View all your job applications and their status.
          </p>
        </div>

        {allJobs.length === 0 ? (
          <p className="text-center text-gray-300">No Job Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allJobs.map((job, index) => (
              <div
                key={index}
                className="bg-[#272727] px-5 py-6 rounded-md shadow-md flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold font-mono">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatDate(job.appliedDate)}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-gray-300">
                    <b>Status:</b> {job.status}
                  </p>
                  <p>
                    <b>Role:</b> {job.role}
                  </p>
                  <p className="text-sm text-gray-400">
                    <b>Job Description:</b> {job.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
          <Link to="/home" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#272727] px-4 py-3 rounded-xl hover:scale-105 transition-all duration-200 font-semibold">
              Go Home
            </button>
          </Link>

          <Link to="/dashboard/create-job" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#272727] px-4 py-3 rounded-xl hover:scale-105 transition-all duration-200 font-semibold">
              Add Job
            </button>
          </Link>
        </div>
      </main>

      <FooterPage />
    </div>
  );
};
