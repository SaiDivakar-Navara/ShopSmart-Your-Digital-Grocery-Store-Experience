import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookies';

import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from './styledComponents';

const ProductItem = ({
  id,
  name,
  description,
  price,
  img,
}) => {
  const handleAddToCart = async () => {
    const userId = Cookies.getItem('userId');

    // Check whether user is logged in
    if (!userId) {
      alert(
        'Please login to add products to your cart.'
      );
      return;
    }

    try {
      await axios.post(
        '/api/add-to-cart',
        {
          userId,
          productId: id,
        }
      );

      alert('Product added to cart!');
    } catch (error) {
      console.error(
        'Error adding product to cart:',
        error
      );

      if (error.response) {
        console.error(
          'Server response:',
          error.response.data
        );

        alert(
          error.response.data?.message ||
            'Unable to add product to cart.'
        );
      } else {
        alert(
          'Unable to connect to the server.'
        );
      }
    }
  };

  return (
    <ProductContainer>
      <ProductImage
        src={img}
        alt={name}
      />

      <ProductName>
        {name}
      </ProductName>

      <ProductPrice>
        ₹{price}
      </ProductPrice>

      <ButtonContainer>
        <Link
          to={`/order-details/${id}`}
          className="btn btn-primary"
          style={{
            borderRadius: '0',
          }}
        >
          Buy Now
        </Link>

        <Button onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </ButtonContainer>
    </ProductContainer>
  );
};

export default ProductItem;
