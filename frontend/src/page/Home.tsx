import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { getAllJobs } from "../services/opreation/jobAPI";
import { HomeJobsComponents } from "../components/core/HomeComponent";

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
  console.log(token);

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

  console.log(allJobs);

  if (loading) {
    return <div className="loader w-9/12 mx-auto mt-4 text-center">Loading...</div>;
  }

  return (
    <div className="w-9/12 mx-auto mt-5">
      <div className="flex items-center justify-center flex-col mb-4">
        <h1 className="text-2xl font-semibold font-mono mb-2 capitalize">
          Hello, welcome to your Job Tracker.
        </h1>
        <p className="text-[14px] italic">
          Keep track of all your job applications, statuses, and updates in one
          organized place — from Applied to Interview to Offer and beyond.
        </p>
      </div>
      
        <HomeJobsComponents jobs={allJobs} />
    
    </div>
  );
};
