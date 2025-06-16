import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineMenuBook } from "react-icons/md";
import { useState } from "react";
import SignUpModal from "../core/modals/auth/SigupModal";
import LogInModal from "../core/modals/auth/LoginModal";

export const NavBar = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  function openLoginModal() {
    setLoginOpen(true);
    setSignupOpen(false);
  }

  function openSignupModal() {
    setSignupOpen(true);
    setLoginOpen(false);
  }

  function closeModals() {
    setLoginOpen(false);
    setSignupOpen(false);
  }

  function switchToSignupModal() {
    setLoginOpen(false);
    setSignupOpen(true);
  }

  function switchToLoginModal() {
    setLoginOpen(true);
    setSignupOpen(false);
  }

  function handleSignupSuccess() {
    console.log("✅ Signup success - opening login modal");
    setSignupOpen(false);
    setLoginOpen(true);
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
              <button
                onClick={openLoginModal}
                className="text-[16px] font-semibold hover:bg-gray-900 hover:px-3 hover:py-1 rounded-sm transition-all duration-200 font-mono"
              >
                LogIn
              </button>
              <button
                onClick={openSignupModal}
                className="text-[16px] font-semibold hover:bg-gray-900 hover:px-3 hover:py-1 transition-all duration-200 rounded-sm font-mono"
              >
                SignUp
              </button>
            </div>
          ) : (
            <button className="text-2xl font-semibold hover:bg-gray-900 hover:px-3 hover:py-1 rounded-sm font-mono">
              <MdOutlineMenuBook />
            </button>
          )}
        </div>
      </div>

      {isLoginOpen && (
        <LogInModal
          onSwitchToSignup={switchToSignupModal}
          onclose={closeModals}
        />
      )}
      {isSignupOpen && (
        <SignUpModal
          onSwitchToLogin={switchToLoginModal}
          onclose={closeModals}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
};
