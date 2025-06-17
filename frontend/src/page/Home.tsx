import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { getAllJobs } from "../services/opreation/jobAPI";
import { HomeJobsComponents } from "../components/core/HomeComponent";
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

export const HomPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const getJobs = async () => {
      if (!token) return;
      setLoading(true);
      const response: any = await dispatch(getAllJobs({ token }));
      if (response.data && response.data.length > 0) {
        setAllJobs(response.data);
      }
      setLoading(false);
    };

    getJobs();
  }, [token]);

  if (loading) {
    return (
      <div className="loader w-full text-center mt-6 text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="w-[90%] max-w-5xl mx-auto mt-6 px-2 sm:px-4">
          {/* Intro Section */}
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold font-mono mb-2 capitalize">
              Hello, welcome to your Job Tracker.
            </h1>
            <p className="text-sm sm:text-base italic text-gray-700">
              Keep track of all your job applications, statuses, and updates in
              one organized place — from Applied to Interview to Offer and
              beyond.
            </p>
          </div>

          {/* Jobs List */}
          <div>
            <HomeJobsComponents jobs={allJobs} />
          </div>

          {/* Add Job Button */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <Link
              to="/dashboard/create-job"
              className="bg-[#272727] text-white px-5 py-3 rounded-xl text-base font-semibold hover:scale-105 transition-all duration-200"
            >
              Add Job
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
};
