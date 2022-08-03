import React, { useEffect, useState } from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Slider from '../components/Slider'
import axios from 'axios'
import styled from 'styled-components'
import Product from '../components/Product'

const ShowCase = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("https://shopping-server-api.herokuapp.com/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <ShowCase>
        {products.map((product) => (
          <Product item={product} key={product._id} />
        ))}
      </ShowCase>
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home