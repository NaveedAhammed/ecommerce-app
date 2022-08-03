import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeProduct } from '../redux/cartRedux';
import { mobile } from "../responsive";
import { toast } from 'react-toastify';


const Delete = styled.button`
  background-color: crimson;
  color: white;
  padding: 6px 10px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Product = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.span`
  font-size: 20px;
`;

const ProductId = styled.span``;

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

const ProductDesc = styled.p``;

const CartItem = ({ title, desc, img, _id, quantity, price }) => {

  const dispatch = useDispatch();

  const onDeleteItemHandler = () => {
    dispatch(removeProduct({ _id, quantity, price }));
    toast("Deleted successfully");
  }

  return (
    <Product>
      <ProductDetail>
        <Image src={img} />
        <Details>
          <ProductName>
            <b>Product:</b> {title}
          </ProductName>
          <ProductDesc>
            {desc}
          </ProductDesc>
          <ProductId>
            <b>ID:</b> {_id}
          </ProductId>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <ProductAmount>quantity: {quantity}</ProductAmount>
        </ProductAmountContainer>
        <ProductPrice>$ {price}</ProductPrice>
        <Delete onClick={onDeleteItemHandler}>Delete</Delete>
      </PriceDetail>
    </Product>
  )
}

export default CartItem;