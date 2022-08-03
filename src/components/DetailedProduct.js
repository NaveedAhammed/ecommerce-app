import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { mobile } from "../responsive";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addProduct } from '../redux/cartRedux';
import { toast } from 'react-toastify';

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Product = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 8;
  display: flex;
`;

const Image = styled.img`
  height: 300px;
  width: 200px;
  object-fit: contain;
  ${mobile({ width: "150px" }, { height: "200px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${mobile({ flexDirection: "column" })}
`;

const ProductName = styled.h1``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-left: 20px;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const ProductDesc = styled.p`
  font-size: 20px;
  max-width: 60%;
  ${mobile({ display: "none" })}
`;

const DetailedProduct = ({ product }) => {

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const amountHandler = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(prev => prev - 1)
    } else {
      setQuantity(prev => prev + 1)
    }
  };

  const addToCartHandler = () => {
    dispatch(addProduct({ ...product, quantity }));
    toast("Added to cart");
  }

  return (
    <Product>
      <ProductDetail>
        <Image src={product.img} />
        <Details>
          <ProductName>
            {product.title}
          </ProductName>
          <ProductDesc>
            {product.desc}
          </ProductDesc>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => amountHandler("dec")} style={{ cursor: "pointer" }} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => amountHandler("inc")} style={{ cursor: "pointer" }} />
            </AmountContainer>
            <Button onClick={addToCartHandler}>ADD TO CART</Button>
          </AddContainer>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <ProductAmount>Price</ProductAmount>
        </ProductAmountContainer>
        <ProductPrice>$ {product.price}</ProductPrice>
      </PriceDetail>
    </Product>
  )
}

export default DetailedProduct;