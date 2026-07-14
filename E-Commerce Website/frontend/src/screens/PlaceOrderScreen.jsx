import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        config
      );

      clearCart();
      alert('Order placed successfully! Redirecting to home...');
      navigate('/');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city}{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {paymentMethod}
            </p>
          </div>

          <div>
            <h2 style={{ marginBottom: '1rem' }}>Order Items</h2>
            {cartItems.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', borderRadius: '4px' }} />
                    <Link to={`/product/${item.product}`} style={{ flex: 1, fontWeight: 'bold' }}>
                      {item.name}
                    </Link>
                    <div>
                      {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Items</span>
              <span>₹{itemsPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Shipping</span>
              <span>₹{shippingPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Tax</span>
              <span>₹{taxPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            {errorMsg && <div style={{ color: 'red', marginBottom: '1rem' }}>{errorMsg}</div>}
            <button
              className="btn btn-primary btn-block"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
