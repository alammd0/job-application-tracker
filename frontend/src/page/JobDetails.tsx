import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getJobDetails } from "../services/opreation/jobAPI";
import type { AppDispatch } from "../redux/store";
import { formatDate } from "../utils/formatDate";
import DeleteJobModal from "../components/core/modals/DeleteJobModal";
import JobUpdateModal from "../components/core/modals/UpdateJobModal";
import { FooterPage } from "../components/main/Footer";

type Job = {
  id: string;
  company: string;
  role: string;
  status: string;
  note?: string;
  appliedDate?: string;
};

export const JobDetails = () => {
  const { id } = useParams();
  const jobId = id;
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setloading(true);
      if (jobId) {
        const job = await dispatch(getJobDetails(jobId));
        setJobDetails(job);
      }
      setloading(false);
    };

    fetchJobDetails();
  }, [jobId]);

  function openDeleteModal() {
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  function openUpdateModal() {
    setUpdateModal(true);
  }

  function closeUpdateModal() {
    setUpdateModal(false);
  }

  if (loading) {
    return <div className="loader w-9/12 mx-auto mt-4 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-grow py-8 px-4">
        <div className="w-full max-w-screen-md mx-auto flex flex-col gap-12">
          {/* Job Details Card */}
          <div className="w-full bg-[#272727] px-6 py-5 rounded-md shadow-md">
            {jobDetails === null ? (
              <p className="text-center text-lg font-semibold">No Details Found</p>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold font-mono capitalize">
                    {jobDetails.company}
                  </p>
                  <p className="text-base">{jobDetails.role}</p>
                  <p className="text-base capitalize">{jobDetails.note}</p>
                </div>

                <div className="flex flex-col gap-1 sm:items-end">
                  <p className="text-base font-semibold capitalize">{jobDetails.status}</p>
                  <p className="text-sm font-bold">
                    {formatDate(jobDetails.appliedDate ?? "")}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={openUpdateModal}
              className="bg-[#2e2e2e] px-4 py-3 rounded-xl hover:scale-105 transition-all duration-200 text-[16px] font-semibold"
            >
              Update Job
            </button>

            <button
              onClick={openDeleteModal}
              className="bg-rose-800 px-4 py-3 rounded-xl hover:scale-105 transition-all duration-200 text-[16px] font-semibold"
            >
              Delete Job
            </button>
          </div>

          {/* Modals */}
          {deleteModal && (
            <DeleteJobModal onclose={closeDeleteModal} jobId={jobId ?? ""} />
          )}
          {updateModal && (
            <JobUpdateModal
              job={jobDetails ?? null}
              onClose={closeUpdateModal}
              jobId={jobId ?? ""}
            />
          )}
        </div>
      </main>

      <FooterPage />
    </div>
  );
};

