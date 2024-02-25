import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StickyNote2Icon from "@mui/icons-material/StickyNote2Outlined";
import TableRowsIcon from "@mui/icons-material/TableRows";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Chip,
  Typography,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "lightBlue",
    cursor: "pointer",
  },
  "& .MuiTableCell-root": {
    fontSize: "0.8rem",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "0.875rem",
}));

const OrdersList = () => {
  //all orders state
  const [orders, setOrders] = useState<any[]>([]);

  //hidden elements count
  const [hiddenItemCount, setHiddenItemCount] = useState(0);
  const navigate = useNavigate();

  //On page load fetch all orders from DB
  useEffect(() => {
    axios
      .get("/orders/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  //Count how many invisible orders we have
  useEffect(() => {
    if (orders) {
      const count = orders.filter((item) => item.is_visible === 0).length;
      setHiddenItemCount(count);
    }
  }, [orders]);

  return (
    <Container sx={{ m: 1 }}>
      <Typography variant="h4" gutterBottom>
        <TableRowsIcon />
        Orders List
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{
          pr: 1,
          fontStyle: "italic",
          color: "text.secondary",
          textAlign: "right",
        }}
      >
        Displaying {orders.length - hiddenItemCount} out of {orders.length}{" "}
        orders
      </Typography>

      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table aria-label="Orders table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Notes</StyledTableCell>
              <StyledTableCell>Creation Time</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) =>
              order.is_visible ? (
                <StyledTableRow
                  key={order.id}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status_id === 0 ? "Not ready" : "Finished"}
                      color={order.status_id === 0 ? "warning" : "success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {" "}
                    {order.notes && (
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <StickyNote2Icon />
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">{order.notes}</Typography>
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>

                  <TableCell>{order.creation_time}</TableCell>
                </StyledTableRow>
              ) : (
                ""
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1" gutterBottom sx={{ pt: 2 }}>
        This list has {hiddenItemCount} hidden{" "}
        {hiddenItemCount == 1 ? "element" : "elements"}! 🤫
      </Typography>
    </Container>
  );
};

export default OrdersList;
