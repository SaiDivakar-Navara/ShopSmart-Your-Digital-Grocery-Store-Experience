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

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
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

const History = () => {
  const userId = Cookies.getItem('userId');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // Don't make API request if user is not logged in
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
        console.error('Error fetching orders:', error);

        if (error.response) {
          console.error(
            'Server response:',
            error.response.data
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

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

  // Filter only completed/canceled orders
  const completedOrders = orders.filter(
    (order) =>
      order.status === 'Delivered' ||
      order.status === 'Canceled'
  );

  return (
    <div>
      <Header />

      <Container>
        <h1 className="text-center">
          My History
        </h1>

        {!userId ? (
          <p className="text-center">
            Please login to view your order history.
          </p>
        ) : completedOrders.length === 0 ? (
          <p className="text-center">
            No completed or canceled orders found.
          </p>
        ) : (
          <OrderList>
            {completedOrders.map((order) => {
              const isDelivered =
                order.status === 'Delivered';

              return (
                <OrderItem
                  key={order._id}
                  style={{
                    border: isDelivered
                      ? '1px solid green'
                      : '1px solid red',
                  }}
                >
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

export default History;
