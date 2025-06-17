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
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 border-b bg-gray-800 p-3 rounded-tr-lg rounded-tl-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-400 text-center">No jobs found</p>
        ) : (
          filteredJobs.map((job, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-[#272727] rounded-md shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              {/* Job Info */}
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">{job.role}</h3>
                <p className="text-sm sm:text-base text-gray-400">{job.company}</p>
              </div>

              {/* Status and Date */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="text-right">
                  <p className="text-sm sm:text-base text-blue-400 font-medium">
                    {job.status}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {formatDate(job.appliedDate)}
                  </p>
                </div>

                {/* Link */}
                <Link
                  className="text-xl text-gray-300 hover:text-white transition"
                  to={`/home/job-details/${job.id}`}
                >
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
