import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/opreation/authAPI";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";

interface FadeProps {
  children: React.ReactElement<any>;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute",
  top: "30%",
  right: "-7%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CloseModal {
  onclose: () => void;
}

export default function ProfileModal({ onclose }: CloseModal) {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  
  const logoutHandler = () => {
    dispatch(logout(navigate));
  };
  
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open
        onClose={onclose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={true} onClick={onclose}>
          <Box sx={style} onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-6 items-start">
              <button className="text-xl font-semibold capitalize font-mono hover:bg-[#272727] hover:text-white px-3 py-2 rounded-md transition-all duration-100">
                <Link to="/dashboard/create-job">Create Project</Link>
              </button>
              <button className="text-xl font-semibold capitalize font-mono hover:bg-[#272727] hover:text-white px-3 py-2 rounded-md transition-all duration-100">
                <Link to="/dashboard/view-jobs">View Your Jobs</Link>
              </button>
              <button className="text-xl font-semibold capitalize font-mono hover:bg-[#272727] hover:text-white px-3 py-2 rounded-md transition-all duration-100">
                <Link to="/dashboard/profile">Your Profile</Link>
              </button>
              <Button onClick={logoutHandler}>LogOut</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
