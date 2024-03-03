import React from "react";
import { Snackbar, Slide, SlideProps } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { STATE } from "../../types/store";

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function TransitionLeft(props: React.JSX.IntrinsicAttributes & SlideProps) {
  return <Slide {...props} direction="left" />;
}
const Toaster = ({
  data,
  handleClose,
}: {
  data: STATE["toasterData"];
  handleClose: () => void;
}) => {
  return (
    <div>
      <Snackbar
        sx={{
          display: data.open ? "block" : "none",
        }}
        open={data.open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={data.severity}>
          {data.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toaster;
