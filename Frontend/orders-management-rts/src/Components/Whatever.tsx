import React, { useEffect, useState } from "react";
import { Snackbar, Typography } from "@mui/material";

const Whatever = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  //on page load show snackbar
  useEffect(() => {
    setOpenSnackbar(true);
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        New Page
      </Typography>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="Success message"
      />
    </>
  );
};

export default Whatever;
