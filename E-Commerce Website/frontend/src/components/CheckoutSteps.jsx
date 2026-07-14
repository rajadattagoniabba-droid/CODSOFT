import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
      <div>
        {step1 ? (
          <Link to="/login" style={{ fontWeight: 'bold' }}>Sign In</Link>
        ) : (
          <span style={{ color: '#ccc' }}>Sign In</span>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping" style={{ fontWeight: 'bold' }}>Shipping</Link>
        ) : (
          <span style={{ color: '#ccc' }}>Shipping</span>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment" style={{ fontWeight: 'bold' }}>Payment</Link>
        ) : (
          <span style={{ color: '#ccc' }}>Payment</span>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/placeorder" style={{ fontWeight: 'bold' }}>Place Order</Link>
        ) : (
          <span style={{ color: '#ccc' }}>Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
