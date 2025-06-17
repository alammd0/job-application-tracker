import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineMenuBook } from "react-icons/md";
import { useState } from "react";
import MenuModal from "../core/modals/MenuModal";

export const NavBar = () => {
  const token = useSelector((state: any) => state.auth.token);

  const [modal, setModal] = useState(false);

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <div className="border-b-gray-600 border-b-1 bg-[#272727]">
      <div className="w-9/12 mx-auto flex h-14 items-center justify-between text-white">
        <div className="text-2xl font-semibold font-display">
          <Link to="/">JTA</Link>
        </div>
        <div>
          {token === null ? (
            <div className="flex gap-8">
              <button className="text-[16px] font-semibold hover:bg-gray-900 hover:px-3 hover:py-1 rounded-sm transition-all duration-200 font-mono">
                <Link to="/Login">LogIn</Link>
              </button>
              <button className="text-[16px] font-semibold hover:bg-gray-900 hover:px-3 hover:py-1 transition-all duration-200 rounded-sm font-mono">
                <Link to="/signup">SignUp</Link>
              </button>
            </div>
          ) : (
            <button
              onClick={openModal}
              className="text-2xl font-semibold hover:bg-gray-900 hover:px-3 hover:py-1 rounded-sm font-mono"
            >
              <MdOutlineMenuBook />
            </button>
          )}
        </div>
      </div>

      {modal && <MenuModal onclose={closeModal} />}
    </div>
  );
};
