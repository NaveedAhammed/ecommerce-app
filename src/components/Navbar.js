import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/userRedux';

const Container = styled.div`
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px", marginLeft: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {

  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const totalItems = useSelector(state => state.cart.totalItems);

  const signoutHandler = () => {
    dispatch(setUser(null));
  }


  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to='/'><Logo>ECOMMERCE</Logo></Link>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Right>
          {user && <MenuItem>MY ORDERS</MenuItem>}
          {user && <MenuItem>MY WISHLIST</MenuItem>}
          {!user && <Link to="/register"><MenuItem>REGISTER</MenuItem></Link>}
          <Link to='/login'><MenuItem onClick={signoutHandler}>{user !== null ? "SIGN OUT" : "SIGN IN"}</MenuItem></Link>
          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;