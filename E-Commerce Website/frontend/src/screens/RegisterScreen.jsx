import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { register, userInfo } = useAuth();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
    } else {
      const res = await register(name, email, password);
      if (!res.success) {
        setErrorMsg(res.error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'var(--color-surface)' }}>
      {redirect === '/shipping' && <CheckoutSteps step1 />}
      <h1 style={{ marginBottom: '1.5rem' }}>Sign Up</h1>
      {errorMsg && <div style={{ backgroundColor: '#ffcccc', color: 'red', padding: '0.5rem', marginBottom: '1rem' }}>{errorMsg}</div>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        Have an Account?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ color: 'var(--color-accent-hover)' }}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
