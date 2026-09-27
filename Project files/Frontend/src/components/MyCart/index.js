import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookies';
import Header from '../Header';
import { Link } from 'react-router-dom';

import {
  ProductContainer,
  ProductName,
  ProductImage,
} from '../ProductItem/styledComponents';

const MyCart = () => {
  const userId = Cookies.getItem('userId');

  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart products
  useEffect(() => {
    const getProductsList = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `/api/cart/${userId}`
        );

        setCartData(response.data);

        console.log('Cart:', response.data);
      } catch (error) {
        console.error(
          'Error fetching cart items:',
          error
        );

        alert(
          'Unable to fetch your cart. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    getProductsList();
  }, [userId]);

  // Remove product from cart
  const handleCancelClick = async (productId) => {
    try {
      await axios.delete(
        `/api/remove-from-cart/${productId}`
      );

      // Update UI immediately after successful deletion
      setCartData((previousCartData) =>
        previousCartData.filter(
          (item) => item._id !== productId
        )
      );

      alert('Product removed from cart.');
    } catch (error) {
      console.error(
        'Error removing product from cart:',
        error
      );

      alert(
        'Unable to remove the product from cart.'
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <Header />

        <div className="container mx-auto px-4 my-4">
          <h1 className="text-3xl font-semibold mt-8">
            Loading cart...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <br />
      <br />

      <h1 className="text-3xl font-semibold mt-8">
        My Cart
      </h1>

      <div className="container mx-auto px-4 my-4">
        {/* User not logged in */}
        {!userId ? (
          <p>
            Please login to view your cart.
          </p>
        ) : cartData.length === 0 ? (
          /* Empty cart */
          <p>Your cart is empty.</p>
        ) : (
          /* Cart products */
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cartData.map((product) => (
              <ProductContainer
                key={product._id}
              >
                <ProductImage
                  src={product.image}
                  alt={product.productname}
                />

                <div className="p-4">
                  <ProductName className="text-xl font-semibold mb-2">
                    {product.productname}
                  </ProductName>

                  <p className="text-gray-700">
                    ₹{product.price}
                  </p>

                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() =>
                        handleCancelClick(
                          product._id
                        )
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove from Cart
                    </button>

                    <Link
                      to={`/order-details/${product._id}`}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Buy this
                    </Link>
                  </div>
                </div>
              </ProductContainer>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyCart;
