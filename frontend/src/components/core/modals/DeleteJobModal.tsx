import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { deleteJob } from "../../../services/opreation/jobAPI";

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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

interface CloseModal {
  jobId : string,
  onclose: () => void;
}

export default function DeleteJobModal({ onclose, jobId }: CloseModal) {

    console.log("Id - ", jobId);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const deleteJobHandler = async () => {
    setLoading(true);
    if (jobId) {
        await dispatch(deleteJob({jobId, navigate}));
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loader w-9/12 mx-auto mt-4"></div>;
  }

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
            <div className="flex flex-col gap-4 items-center justify-center">
              <p className="text-xl font-mono">Are you Sure Delete Our Job?</p>
              <button onClick={deleteJobHandler} className=" bg-red-800 px-3 py-2 text-xl font-semibold capitalize rounded-md text-white">
                Yes
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
