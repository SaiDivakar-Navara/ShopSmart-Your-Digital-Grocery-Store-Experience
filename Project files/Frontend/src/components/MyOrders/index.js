import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import Header from '../Header';


// Styled components
const Container = styled.div`
  padding: 20px;
  margin-top: 10vh;
  text-align: start;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const MyOrders = () => {
  const userId = Cookies.getItem('userId');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // User is not logged in
      if (!userId) {
        setLoading(false);
        return;
      }

      // API URL is not configured
      if (!API_URL) {
        console.error(
          'VITE_API_URL is not configured.'
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `/api/my-orders/${userId}`
        );

        setOrders(response.data);
      } catch (error) {
        console.error(
          'Error fetching orders:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Loading state
  if (loading) {
    return (
      <div>
        <Header />

        <Container>
          <h1 className="text-center">
            Loading orders...
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <Container>
        <h1 className="text-center">
          My Orders
        </h1>

        {!userId ? (
          <p className="text-center">
            Please login to view your orders.
          </p>
        ) : orders.length === 0 ? (
          <p className="text-center">
            You don't have any orders yet.
          </p>
        ) : (
          <OrderList>
            {orders.map((order) => {
              // Don't show delivered orders
              if (order.status === 'Delivered') {
                return null;
              }

              return (
                <OrderItem key={order._id}>
                  <Strong>Order ID:</Strong>{' '}
                  {order._id}
                  <br />

                  <Strong>Name:</Strong>{' '}
                  {order.firstname}{' '}
                  {order.lastname}
                  <br />

                  <Strong>Phone:</Strong>{' '}
                  {order.phone}
                  <br />

                  <Strong>Date:</Strong>{' '}
                  {order.createdAt}
                  <br />

                  <Strong>Price:</Strong>{' '}
                  {order.price}
                  <br />

                  <Strong>Status:</Strong>{' '}
                  {order.status}
                  <br />

                  <Strong>Payment Method:</Strong>{' '}
                  {order.paymentMethod}
                  <br />
                </OrderItem>
              );
            })}
          </OrderList>
        )}
      </Container>
    </div>
  );
};

export default MyOrders;
