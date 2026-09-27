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

        alert(
          'Unable to fetch your orders. Please try again.'
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

  // Only show orders that are NOT delivered
  const activeOrders = orders.filter(
    (order) => order.status !== 'Delivered'
  );

  return (
    <div>
      <Header />

      <Container>
        <h1 className="text-center">
          My Orders
        </h1>

        {/* User is not logged in */}
        {!userId ? (
          <p className="text-center">
            Please login to view your orders.
          </p>
        ) : activeOrders.length === 0 ? (
          /* No active orders */
          <p className="text-center">
            You don't have any active orders.
          </p>
        ) : (
          <OrderList>
            {activeOrders.map((order) => (
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
            ))}
          </OrderList>
        )}
      </Container>
    </div>
  );
};

export default MyOrders;
