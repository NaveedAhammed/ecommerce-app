import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from "../responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { addProduct } from "../redux/cartRedux";
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 32px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 18px;
  line-height: 2rem;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  font-weight: 700;
`;

const AddContainer = styled.div`
  width: 50%;
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
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Small = styled.small`
  font-size: 26px;
`;

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest("/products/find/" + params.id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getProduct();
  }, [params.id]);

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
    <div>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price><Small>$</Small> {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => amountHandler("dec")} style={{ cursor: "pointer" }} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => amountHandler("inc")} style={{ cursor: "pointer" }} />
            </AmountContainer>
            <Button onClick={addToCartHandler}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;