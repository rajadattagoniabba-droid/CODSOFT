import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        
        {/* Brand */}
        <div className="brand-logo gradient-text" style={{ fontSize: '2rem' }}>
          Taiga
        </div>
        
        {/* Links */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Home</Link>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Collections</Link>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>About Us</Link>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Contact</Link>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Privacy Policy</Link>
        </div>

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaTwitter /></a>
          <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaInstagram /></a>
          <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaGithub /></a>
          <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaLinkedin /></a>
        </div>

        {/* Copyright */}
        <div style={{ width: '100%', height: '1px', background: 'var(--border-glass)', marginTop: '1rem' }}></div>
        <p>&copy; {currentYear} Taiga E-Commerce. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;
