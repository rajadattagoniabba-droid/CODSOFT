import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item) => (
              <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', borderRadius: '4px' }} />
                <Link to={`/product/${item.product}`} style={{ flex: 1, fontWeight: 'bold' }}>{item.name}</Link>
                <div style={{ fontWeight: 'bold' }}>₹{item.price}</div>
                <select 
                  value={item.qty} 
                  onChange={(e) => addToCart(item, Number(e.target.value))}
                  style={{ padding: '0.5rem' }}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button onClick={() => removeFromCart(item.product)} className="btn" style={{ color: 'red' }}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="card" style={{ padding: '1rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </div>
          <button 
            className="btn btn-primary btn-block" 
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
