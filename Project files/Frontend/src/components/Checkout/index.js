import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookies';
import Header from '../Header';



const FormContainer = styled.div`
  text-align: start;
  width: 600px;
  margin: 12vh auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FormHeader = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Checkout = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    quantity: '',
    paymentMethod: 'cod',
    address: '',
  });

  const [productDetails, setProductDetails] = useState({
    productname: '',
    price: 0,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Check API configuration
  useEffect(() => {
    if (!API_URL) {
      console.error(
        'VITE_API_URL is not configured. Please check your .env file.'
      );
    }
  }, []);

  // Fetch product details
  useEffect(() => {
    if (!id || !API_URL) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/products/${id}`);

        const productData = response.data;

        setProductDetails({
          productname: productData.productname,
          price: productData.price,
        });
      } catch (error) {
        console.error('Error fetching product data:', error);
        alert('Unable to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      alert('API URL is not configured.');
      return;
    }

    if (!id) {
      alert('Product ID is missing.');
      return;
    }

    const userId = Cookies.getItem('userId');

    if (!userId) {
      alert('Please login before placing an order.');
      return;
    }

    if (!productDetails.productname) {
      alert('Product details are not available.');
      return;
    }

    try {
      setSubmitting(true);

      const formDetails = {
        ...formData,
        user: userId,
        productId: id,
        price: productDetails.price,
        productname: productDetails.productname,
      };

      const response = await axios.post(
        `/api/orders`,
        formDetails
      );

      console.log('Order created:', response.data);

      alert('Order created successfully!');

      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        phone: '',
        quantity: '',
        paymentMethod: 'cod',
        address: '',
      });
    } catch (error) {
      console.error('Error creating order:', error);

      if (error.response) {
        console.error('Server response:', error.response.data);
        alert(
          error.response.data?.message ||
            'Failed to create the order.'
        );
      } else {
        alert('Unable to connect to the server.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <FormContainer>
          <FormHeader>Loading product...</FormHeader>
        </FormContainer>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <FormContainer>
        <FormHeader>Order Details</FormHeader>

        {/* Product information */}
        <div style={{ marginBottom: '20px' }}>
          <h3>{productDetails.productname}</h3>
          <p>
            Price: ₹{productDetails.price}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First Name:</Label>

            <Input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>

            <Input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone:</Label>

            <Input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Quantity:</Label>

            <Input
              type="number"
              name="quantity"
              placeholder="Enter the quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Address:</Label>

            <textarea
              rows={5}
              style={{
                width: '100%',
                border: '1px solid grey',
                padding: '10px',
                borderRadius: '4px',
                resize: 'vertical',
              }}
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Payment Method:</Label>

            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="cod">
                Cash on Delivery (COD)
              </option>

              <option value="credit">
                Credit Card
              </option>

              <option value="debit">
                Debit Card
              </option>
            </Select>
          </FormGroup>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Placing Order...' : 'Submit'}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Checkout;
