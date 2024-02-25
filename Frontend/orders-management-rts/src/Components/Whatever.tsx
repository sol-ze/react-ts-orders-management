import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";

const Whatever = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(true);
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <h1>New Page</h1>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Success message"
      />
    </>
  );
};

export default Whatever;
