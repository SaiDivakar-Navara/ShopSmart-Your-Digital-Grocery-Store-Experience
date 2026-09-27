import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import Header from '../Header';


const commonFields = [
  {
    controlId: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    controlId: 'password',
    label: 'Password',
    type: 'password',
  },
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.getItem('jwtToken');
    const adminToken = localStorage.getItem('adminJwtToken');

    if (token) {
      navigate('/');
    } else if (adminToken) {
      navigate('/admin/all-products');
    }
  }, [navigate]);

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      console.error(
        'VITE_API_URL is not configured. Please check your .env file.'
      );

      alert('API configuration is missing.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Normal user login
        if (data.token) {
          Cookies.setItem('jwtToken', data.token, {
            expires: 30,
          });

          Cookies.setItem('userId', data.user._id);

          Cookies.setItem(
            'userName',
            data.user.firstname
          );

          alert('Login Successful');

          navigate('/');
        }

        // Admin login
        else if (data.jwtToken) {
          localStorage.setItem(
            'adminJwtToken',
            data.jwtToken
          );

          Cookies.setItem(
            'userName',
            data.user.firstname
          );

          navigate('/admin/dashboard');
        }

        // Successful response but no token
        else {
          alert('Login failed. Token was not received.');
        }
      } else {
        alert(
          data.message ||
            "Email or Password didn't match"
        );
      }
    } catch (error) {
      console.error('Error during login:', error);

      alert(
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          paddingTop: '10vh',
        }}
      >
        <Card
          className="shadow p-4"
          style={{ width: '400px' }}
        >
          <Card.Body>
            <h2 className="mb-4">Login</h2>

            <Form onSubmit={handleSubmit}>
              {commonFields.map((field) => (
                <Form.Group
                  style={{
                    textAlign: 'start',
                    marginBottom: '10px',
                  }}
                  controlId={field.controlId}
                  key={field.controlId}
                >
                  <Form.Label>
                    {field.label}
                  </Form.Label>

                  <Form.Control
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    name={field.controlId}
                    value={
                      formData[field.controlId]
                    }
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              ))}

              <Button
                type="submit"
                className="btn-primary w-100 mt-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            <p>
              Don't have an account?{' '}
              <Link to="/signup">
                Sign Up
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
