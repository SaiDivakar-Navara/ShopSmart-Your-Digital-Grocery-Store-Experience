import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import Header from '../Header';

const commonFields = [
  {
    controlId: 'firstName',
    label: 'First Name',
    type: 'text',
  },
  {
    controlId: 'lastName',
    label: 'Last Name',
    type: 'text',
  },
  {
    controlId: 'username',
    label: 'Username',
    type: 'text',
  },
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

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      console.error(
        'VITE_API_URL is not configured.'
      );

      alert('API configuration is missing.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(
          'Registration successful:',
          data
        );

        alert('Registration successful');

        navigate('/login');
      } else {
        alert(
          data.message ||
            'Registration failed. Please try again.'
        );
      }
    } catch (error) {
      console.error(
        'Error during registration:',
        error
      );

      alert(
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="mb-4">
              Sign Up
            </h2>

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
                {loading
                  ? 'Creating Account...'
                  : 'Sign Up'}
              </Button>
            </Form>

            <p>
              Already have an account?{' '}
              <Link to="/login">
                Log In
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Registration;
