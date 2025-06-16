import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

interface CloseModalsProps {
  onclose: () => void;
  onSwitchToSignup: () => void;
}

export default function LogInModal({ onclose, onSwitchToSignup }: CloseModalsProps) {
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
        <Fade in={true}>
          <Box sx={style}>
            <p className="text-xl font-semibold pb-3 font-mono">
              Login Your Account
            </p>

            <form>
              <Stack className="flex flex-col gap-5">
                <FormControl className="mb-6">
                  <FormLabel>Email:</FormLabel>
                  <Input placeholder="Enter Your Email" type="text" required />
                </FormControl>

                <FormControl className="mb-2">
                  {" "}
                  {/* smaller gap here */}
                  <FormLabel>Password:</FormLabel>
                  <Input placeholder="Password" type="password" required />
                </FormControl>

                <Button type="submit">Login</Button>

                {/* 👇 Add this to switch */}
                <p className="text-sm">
                  Don't have an account?{" "}
                  <span
                    onClick={onSwitchToSignup}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Sign Up
                  </span>
                </p>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
