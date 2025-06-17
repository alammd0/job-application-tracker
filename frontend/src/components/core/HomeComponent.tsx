import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import { HiBookOpen } from "react-icons/hi2";

const tabs = ["All", "Applied", "Interview", "Offer", "Rejected", "Accepted"];

export const HomeJobsComponents = ({ jobs }: { jobs: any[] }) => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredJobs =
    activeTab === "All" ? jobs : jobs.filter((job) => job.status === activeTab);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b bg-gray-800 p-3 rounded-tr-lg rounded-tl-lg">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[16px] font-medium border-b-2 ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="space-y-2">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-400">No jobs found</p>
        ) : (
          filteredJobs.map((job, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#272727] rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">{job.role}</h3>
                <p className="text-lg text-gray-600">{job.company}</p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-lg text-blue-500 font-medium">
                    {job.status}
                  </p>
                  <p className="text-sm">{formatDate(job.appliedDate)}</p>
                </div>
                
                <Link className="text-xl text-gray-400" to="/home/job-details">
                 <HiBookOpen />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
