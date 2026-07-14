import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const { shippingAddress, savePaymentMethod } = useCart();
  const navigate = useNavigate();

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', backgroundColor: 'var(--color-surface)', borderRadius: '8px' }}>
      <CheckoutSteps step1 step2 step3 />
      <h1 style={{ marginBottom: '1.5rem' }}>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Select Method</label>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="Stripe" style={{ cursor: 'pointer' }}>Stripe (Credit Card)</label>
          </div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="PayPal" style={{ cursor: 'pointer' }}>PayPal</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
