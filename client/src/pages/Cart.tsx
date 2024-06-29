import { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const cartItems = [
  {
    productId: 'owf',
    photo:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'macbook',
    price: 3758,
    quantity: 2,
    stock: 10,
    handler: () => {},
  },
];
let subtotal = 2000;
const tax = Math.round(subtotal * 0.18);
const shipping = 100;
const discount = 0;
const total = subtotal + tax + shipping;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [validCouponCode, setValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (Math.random() > 0.5) setValidCouponCode(true);
      else setValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
      setValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem key={index} cartItem={item} />
          ))
        ) : (
          <p>No Items Added</p>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shipping}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="green"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (validCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to={'/shipping'}>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
