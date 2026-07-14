import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, userInfo } = useAuth();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.success) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'var(--color-surface)' }}>
      {redirect === '/shipping' && <CheckoutSteps step1 />}
      <h1 style={{ marginBottom: '1.5rem' }}>Sign In</h1>
      {errorMsg && <div style={{ backgroundColor: '#ffcccc', color: 'red', padding: '0.5rem', marginBottom: '1rem' }}>{errorMsg}</div>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign In
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ color: 'var(--color-accent-hover)' }}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
