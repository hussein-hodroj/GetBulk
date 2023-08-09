import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.product.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemAmount(amount);
  }, [cart]);

  const addToCart = (product) => {
    const cartItem = cart.find(item => item.product._id === product._id);

    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.product._id === product._id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, { product, amount: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.product._id !== productId);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (productId) => {
    const cartItem = cart.find(item => item.product._id === productId);
    addToCart(cartItem.product);
  };

  const decreaseAmount = (productId) => {
    const cartItem = cart.find(item => item.product._id === productId);
    if (cartItem && cartItem.amount > 0) {
      const newCart = cart.map(item => {
        if (item.product._id === productId) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem && cartItem.amount <= 1) {
      removeFromCart(productId);
    }
  };

  
  useEffect(() => {
    fetch('/api/products') 
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
