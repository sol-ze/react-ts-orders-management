import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectShowComponentConfig } from "../store/configurationsSlice";
import styles from "../styles/ButtonStyles.module.scss";
import StickyNote2Icon from "@mui/icons-material/StickyNote2Outlined";

import ROUTES from "../routes/routes";

interface Item {
  name: string;
  quantity: number;
  price_per_item: number;
}

interface Order {
  id: number;
  customer_name: string;
  status_id: number;
  creation_time: string;
  notes: string;
  total_amount: number;
  items: Item[];
}

const ViewOrder = () => {
  const { id } = useParams();

  //state for order details
  const [order, setOrder] = useState<Order | null>(null);

  //app configuration is saved in redux store
  const showComponent = useSelector(selectShowComponentConfig);

  const navigate = useNavigate();

  //get all order details by id
  useEffect(() => {
    if (id) {
      axios
        .get(`/orders/${id}`)
        .then((response) => {
          setOrder(response.data);
        })
        .catch((error) =>
          console.error("Error fetching order details:", error)
        );
    }
  }, [id]);

  //next button navigates to another page
  const handleNextButtonClick = () => {
    navigate(ROUTES.WHATEVER);
  };

  //back button going back to the main page
  const handleBackButtonClick = () => {
    navigate(ROUTES.HOME);
  };

  if (!order) return <div>Loading...</div>;

  return (
    <Container disableGutters sx={{ ml: 3, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="h6">Viewing details of order #{order.id}</Typography>
      {showComponent ? (
        <div>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={2}>
              <strong>Customer:</strong>
            </Grid>
            <Grid item xs={10}>
              {order.customer_name}
            </Grid>

            <Grid item xs={2}>
              <strong>Status:</strong>
            </Grid>
            <Grid item xs={10}>
              <Chip
                label={order.status_id === 0 ? "Not ready" : "Finished"}
                color={order.status_id === 0 ? "warning" : "success"}
                size="small"
              />
            </Grid>

            <Grid item xs={2}>
              <strong>Creation Time:</strong>
            </Grid>
            <Grid item xs={10}>
              {order.creation_time}
            </Grid>

            <Grid item xs={2}>
              <strong>Notes:</strong>
            </Grid>
            <Grid item xs={10}>
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
            </Grid>

            <Grid item xs={2}>
              <strong>Total Amount:</strong>
            </Grid>
            <Grid item xs={10}>
              {order.total_amount}$
            </Grid>

            <Grid item xs={2} sx={{ mb: 2 }}>
              <strong>Order Details:</strong>
            </Grid>
          </Grid>
          <Box sx={{ border: 1, p: 2, width: { xs: 1, sm: 1 / 2 } }}>
            {order.items.map((item, index) => (
              <Grid item container sx={{ my: 1 }} spacing={2} key={index}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4} md={3}>
                    <Typography sx={{ ml: 1 }}> {item.name}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Typography>{item.quantity}x</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Typography>
                      {item.quantity * item.price_per_item}$
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Box>
          <Button
            onClick={handleBackButtonClick}
            variant="contained"
            className={styles.darkButton}
            sx={{ mt: 2 }}
          >
            Back
          </Button>
          <Button
            onClick={handleNextButtonClick}
            variant="contained"
            sx={{ mt: 2, mx: 2 }}
          >
            Next
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h6" color="red">
            This is a secret component, you can't see it, limited by store
            configurations
          </Typography>
          <Button
            onClick={handleBackButtonClick}
            variant="contained"
            className={styles.darkButton}
            sx={{ mt: 2 }}
          >
            Back
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ViewOrder;
