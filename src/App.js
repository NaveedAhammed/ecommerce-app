import Home from "./pages/Home";
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { setUser } from './redux/userRedux';
import PageNotFound from "./pages/PageNotFound";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jsonObj = JSON.parse(storedUser);
    if (storedUser) {
      dispatch(setUser(jsonObj));
    }
  }, [dispatch]);

  const user = useSelector(state => state.user.currentUser);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={user !== null ? <Navigate to='/' /> : <Login />} />
      <Route path="/register" element={user !== null ? <Navigate to='/' /> : <Register />} />
      <Route path="/shipping" element={<PageNotFound />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
