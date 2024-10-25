import { Route, Routes,  } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
import { useState } from 'react';
import Sucursales from './pages/Sucursales';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPurchaseConfirmed, setIsPurchaseConfirmed] = useState(false);

  const addToCart = (product: Omit<Product, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, price: parseFloat((item.price + product.price).toFixed(1)) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id)); 
  };

  const incrementQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, price: parseFloat((item.price + item.price / item.quantity).toFixed(1)) }
          : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, price: parseFloat((item.price - item.price / item.quantity).toFixed(1)) }
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(parseFloat(total.toFixed(1))); 
  };

  const confirmPurchase = () => {
    setIsPurchaseConfirmed(true);
    setCartItems([]); 
    setTotalPrice(0); 
  };

 

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path='/' element={<Home addToCart={addToCart} />} />
        <Route
          path='/carrito'
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              calculateTotalPrice={calculateTotalPrice}
              totalPrice={totalPrice}
              confirmPurchase={confirmPurchase}
              isPurchaseConfirmed={isPurchaseConfirmed}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          }
        />
        <Route path='/nosotros' element={<About />} />
        <Route path='/sucursales' element={<Sucursales />} />
      </Routes>

      <Footer /> 
    </>
  );
}

export default App;
