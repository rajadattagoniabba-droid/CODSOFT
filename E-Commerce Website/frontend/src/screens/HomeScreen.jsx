import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Cinematic Hero Section */}
      <div className="hero">
        <h1 className="gradient-text">Discover Your Next Obsession.</h1>
        <p>Explore our curated collection of premium products, designed to elevate your everyday experience with breathtaking aesthetics and peerless performance.</p>
        <Link to="/" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
          Shop the Collection
        </Link>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Featured Arrivals</h2>
          <Link to="/" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>View All →</Link>
        </div>
        
        <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', borderRadius: '2px', marginBottom: '2rem' }}></div>

        {loading ? (
          <h2 style={{ textAlign: 'center', padding: '4rem' }}>Loading...</h2>
        ) : error ? (
          <h3 className="text-danger" style={{ textAlign: 'center', padding: '4rem' }}>{error}</h3>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
