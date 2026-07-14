import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Header = () => {
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div className="container header-container">
        {/* Brand */}
        <Link to="/" className="brand-logo gradient-text">
          Taiga
        </Link>

        {/* Minimal Search Bar */}
        <form onSubmit={submitHandler} style={{ flexGrow: 1, maxWidth: '400px', margin: '0 2rem', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search collections..."
            style={{ paddingRight: '40px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.05)' }}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <FaSearch />
          </button>
        </form>

        {/* Navigation */}
        <nav className="nav-links">
          {userInfo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span className="nav-link">Hi, {userInfo.name.split(' ')[0]}</span>
              <button onClick={logout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <FaUser /> Sign In
            </Link>
          )}

          <Link to="/cart" className="nav-link" style={{ position: 'relative' }}>
            <FaShoppingCart style={{ fontSize: '1.2rem' }} />
            {cartItems.length > 0 && (
              <span className="cart-badge" style={{ position: 'absolute', top: '-8px', right: '-12px' }}>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
