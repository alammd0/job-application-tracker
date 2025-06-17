import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../services/opreation/authAPI";
import DeleteProfileModal from "../components/core/modals/DeleteprofileModal";
import { Link } from "react-router-dom";
import { FooterPage } from "../components/main/Footer";

interface userDetails {
  name: string;
  email: string;
  jobs: [];
  role: string;
}

export const Profile = () => {
  const [user, setUser] = useState<userDetails | null>(null);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const hasFetchedRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const openDeleteModal = () => setOpenModal(true);
  const closeDeleteModal = () => setOpenModal(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (token && !hasFetchedRef.current) {
        const user = await dispatch(getuser({ token }) as any);
        hasFetchedRef.current = true;
        setUser(user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [token, dispatch]);

  if (loading) {
    return <div className="loader w-9/12 mx-auto mt-4 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-10 sm:gap-20 items-center">

          {/* Profile Card */}
          <div className="bg-[#272727] w-full max-w-md rounded-md shadow-md">
            <h1 className="text-center pt-4 text-xl font-semibold font-mono text-white">
              Your Profile Section
            </h1>
            <div className="flex flex-col gap-4 px-5 py-7">
              <h1 className="bg-[#413e3e] px-3 py-3 rounded-sm text-xl font-semibold font-mono capitalize">
                User Name : {user?.name}
              </h1>
              <p className="bg-[#413e3e] px-3 py-3 rounded-sm text-sm font-semibold font-mono break-words">
                Email : {user?.email}
              </p>
              <p className="bg-[#413e3e] px-3 py-3 rounded-sm text-xl font-semibold font-mono capitalize">
                User Role : {user?.role}
              </p>
              <p className="bg-[#413e3e] px-3 py-3 rounded-sm text-xl font-semibold font-mono capitalize">
                Total Jobs : {user?.jobs.length}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={openDeleteModal}
              className="bg-red-800 px-4 py-3 rounded-md text-xl font-semibold text-white hover:scale-105 transition-all duration-200"
            >
              Delete Profile
            </button>

            <Link to="/home" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#272727] px-4 py-3 rounded-xl hover:scale-105 transition-all duration-200 text-[16px] font-semibold">
                Go Home
              </button>
            </Link>
          </div>

          {openModal && <DeleteProfileModal onclose={closeDeleteModal} />}
        </div>
      </main>

      <FooterPage />
    </div>
  );
};
