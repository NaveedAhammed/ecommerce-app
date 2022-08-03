import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DetailedProduct from './DetailedProduct';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Products = ({ cat, sort }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `https://shopping-server-api.herokuapp.com/api/products?category=${cat}` : "https://shopping-server-api.herokuapp.com/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, [cat]);

  useEffect(() => {
    if (sort === 'newest') {
      setProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    }
    else if (sort === 'asc') {
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    }
    else {
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort]);

  return (
    <Container>
      {cat ? products.map((product) => (
        <DetailedProduct product={product} key={product._id} />
      )) : products.map(item => <DetailedProduct product={item} key={item._id} />)}
    </Container>
  )
}

export default Products