import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { setCart } from "../redux/cartRedux";


const KEY = process.env.REACT_APP_STRIPE

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-decoration: underline;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const NoItems = styled.h1`
  font-size: 32px;
  font-weight: 500;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch()

  const onToken = (token) => {
    setStripeToken(token);
  }

  useEffect(() => {
    const makeRequest = async () => {
      dispatch(setCart());
    }

    stripeToken && makeRequest();
  }, [stripeToken, dispatch]);

  return (
    <>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>SHOPPING BAG</Title>
        <Bottom>
          <Info>
            {cart.products.length > 0 ? cart.products.map(product => (
              <CartItem
                key={product._id}
                _id={product._id}
                title={product.title}
                desc={product.desc}
                img={product.img}
                quantity={product.quantity}
                price={product.price}
              />
            )) : <NoItems>No Items</NoItems>}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Ecommerce"
              description={`Your total is ${cart.total}`}
              ComponentClass="div"
              panelLabel="Give Money"
              amount={cart.total * 100}
              currency="USD"
              stripeKey={KEY}
              shippingAddress
              billingAddress
              zipCode={false}
              allowRememberMe // "Remember Me" option (default true)
              token={onToken}
            >
              <Button disabled={cart.total === 0}>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Cart;