import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
import Header from '../Header';


const ProductsContainer = styled.div`
  margin-top: 10vh;
  padding: 20px;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  max-width: 270px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('all');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!API_URL) {
        console.error(
          'VITE_API_URL is not configured.'
        );

        setError('API configuration is missing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `/api/products`
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          );
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(
          'Error fetching products:',
          error
        );

        setError(
          'Unable to load products. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Category handler
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter products
  const filteredProducts = products.filter(
    (product) => {
      const productName =
        product.productname?.toLowerCase() || '';

      const category =
        product.category?.toLowerCase() || '';

      const search =
        searchQuery.toLowerCase().trim();

      const productNameMatchesSearch =
        search === '' ||
        productName.includes(search);

      if (selectedCategory === 'all') {
        return productNameMatchesSearch;
      }

      return (
        productNameMatchesSearch &&
        category === selectedCategory
      );
    }
  );

  // Get unique categories
  const categories = [
    'all',
    ...new Set(
      products
        .map(
          (product) =>
            product.category?.toLowerCase()
        )
        .filter(Boolean)
    ),
  ];

  return (
    <div>
      <Header />

      <ProductsContainer>
        {/* Carousel */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>

            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="1"
            ></li>

            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="2"
            ></li>
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item active">
              {/* Add first banner here if needed */}
            </div>

            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://img.freepik.com/free-vector/beautiful-banner-floral-leaves-template_21799-2812.jpg?size=626&ext=jpg&ga=GA1.2.1493657015.1690885278&semt=ais"
                alt="Second slide"
              />
            </div>

            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://img.freepik.com/free-psd/spring-sale-social-media-cover-template_47987-15231.jpg?size=626&ext=jpg&ga=GA1.2.1493657015.1690885278&semt=ais"
                alt="Third slide"
              />
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>

            <span className="sr-only">
              Previous
            </span>
          </a>

          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>

            <span className="sr-only">
              Next
            </span>
          </a>
        </div>

        {/* Filters */}
        <FiltersContainer>
          <div className="w-100">
            <h3>
              Search By Product Name
            </h3>

            <SearchBar
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="w-100">
            <h3>
              Filter By Category
            </h3>

            <CategoryFilter
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </CategoryFilter>
          </div>
        </FiltersContainer>

        <Heading>
          Products
        </Heading>

        {/* Loading */}
        {loading && (
          <p>
            Loading products...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p style={{ color: 'red' }}>
            {error}
          </p>
        )}

        {/* No products */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <p>
              No products found.
            </p>
          )}

        {/* Products */}
        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <StyledList>
              {filteredProducts.map(
                (product) => (
                  <ListItem
                    key={product._id}
                  >
                    <ProductItem
                      id={product._id}
                      img={product.image}
                      name={
                        product.productname
                      }
                      description={
                        product.description
                      }
                      price={
                        product.price
                      }
                    />
                  </ListItem>
                )
              )}
            </StyledList>
          )}
      </ProductsContainer>
    </div>
  );
};

export default Products;
