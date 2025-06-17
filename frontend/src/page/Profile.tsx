import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../services/opreation/authAPI";
import { useRef } from "react";
import DeleteProfileModal from "../components/core/modals/DeleteprofileModal";

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

  const openDeleteModal = () => {
    setOpenModal(true);
  }

  const closeDeleteModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (token) {
        const user = await dispatch(getuser({ token }) as any);
        hasFetchedRef.current = true;
        setUser(user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [token, dispatch]);

  //   console.log(user);

  if (loading) {
    return <div className="loader w-9/12 mx-auto mt-4"></div>;
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="bg-[#272727] w-[450px] mx-auto rounded-md shadow-2xs shadow-gray-700">
        <h1 className="text-center pt-4 text-xl font-semibold font-mono text-white">
          Your Profile Section
        </h1>

        <div className="flex flex-col gap-4 px-5 py-7">
          <h1 className="bg-[#413e3e] px-2 py-3 rounded-sm text-xl font-semibold font-mono capitalize">
            User Name : {user?.name}
          </h1>
          <p className="bg-[#413e3e] px-2 py-3 rounded-sm text-[14px] font-semibold font-mono capitalize">
            Email : {user?.email}
          </p>
          <p className="bg-[#413e3e] px-2 py-3 rounded-sm text-xl font-semibold font-mono capitalize">
            User Role : {user?.role}
          </p>
          <p className="bg-[#413e3e] px-2 py-3 rounded-sm text-xl font-semibold font-mono capitalize">
            Total Jobs : {user?.jobs.length}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button onClick={openDeleteModal} className=" bg-red-800 px-4 py-2 text-xl font-semibold capitalize rounded-md">Delete Profile</button>
      </div>


      {
        openModal && (
            <DeleteProfileModal onclose={closeDeleteModal} />
        )
      }
      
    </div>
  );
};
