import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
const WA_NUMBER = '91XXXXXXXXXX'; // ← your number

const CATEGORIES = [
  { icon: '💍', name: 'Rings',     count: '48 designs' },
  { icon: '📿', name: 'Necklaces', count: '62 designs' },
  { icon: '✨', name: 'Earrings',  count: '94 designs' },
  { icon: '💛', name: 'Bangles',   count: '37 designs' },
  { icon: '🔱', name: 'Pendants',  count: '55 designs' },
];

const FALLBACK = [
  { id: 1, name: 'Peacock Jhumka',     category: 'Earrings',  weight: '1g', price: 450,  bg: '#FAF0DC', icon: '✨' },
  { id: 2, name: 'Floral Ring Set',    category: 'Rings',     weight: '1g', price: 380,  bg: '#FBF2E0', icon: '💍' },
  { id: 3, name: 'Lakshmi Temple Set', category: 'Necklaces', weight: '1g', price: 1200, bg: '#F9EDD4', icon: '📿' },
  { id: 4, name: 'Bridal Bangle Set',  category: 'Bangles',   weight: '1g', price: 850,  bg: '#FDF5E2', icon: '💛' },
];

function ProductCard({ product }) {
  const msg = encodeURIComponent('Hi! I want to order: ' + product.name + ' (Rs.' + product.price + ')');
  return (
    <div className="product-card">
      <div className="product-img" style={{ background: product.bg || '#FAF0DC' }}>
        {product.image_url ? <img src={product.image_url} alt={product.name} /> : <span>{product.icon || '✨'}</span>}
      </div>
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-weight">{product.weight || '1 gram'} · Gold plated</div>
        <div className="product-footer">
          <div className="product-price">₹{Number(product.price).toLocaleString('en-IN')}</div>
          <a className="wa-btn" href={'https://wa.me/' + WA_NUMBER + '?text=' + msg} target="_blank" rel="noopener noreferrer">📱 Order</a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState(FALLBACK);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/products?featured=true')
      .then(r => r.json())
      .then(data => { if (data.length) setFeatured(data.slice(0, 4)); })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="hero-text">
          <div className="hero-eyebrow">Nakshatra 1 Gram Jewels</div>
          <h1 className="hero-title">Elegance in <em>Every Gram</em></h1>
          <p className="hero-sub">Crafted with precision, adorned with tradition. Discover our exquisite collection of 1 gram gold jewellery.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('/catalog')}>Explore Collection</button>
            <a className="btn-outline" href={'https://wa.me/' + WA_NUMBER} target="_blank" rel="noopener noreferrer">Order via WhatsApp</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-ornament" />
          <div className="hero-ornament hero-ornament-2" />
          <div className="hero-center-text">
            <div className="hero-gram">1g</div>
            <div className="hero-gram-sub">Pure Gold Plated</div>
          </div>
        </div>
      </div>

      <div className="stats">
        {[['500+','Designs'],['10K+','Happy Customers'],['1g','Gold Plated'],['100%','Genuine Quality']].map(([n,l]) => (
          <div className="stat" key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>

      <div className="section categories">
        <div className="section-head"><div className="section-title">Shop by <span>Category</span></div></div>
        <div className="cat-grid">
          {CATEGORIES.map(cat => (
            <div className="cat-card" key={cat.name} onClick={() => navigate('/catalog?category=' + cat.name)}>
              <div className="cat-icon">{cat.icon}</div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div className="section-title">Featured <span>Pieces</span></div>
          <span className="view-all" onClick={() => navigate('/catalog')}>View all →</span>
        </div>
        <div className="product-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      <div className="about">
        <div className="about-text">
          <div className="about-eyebrow">Our Story</div>
          <div className="about-title">Quality you can <em>trust</em></div>
          <p className="about-body">Nakshatra 1 Gram Jewels crafts affordable gold-plated jewellery that brings the look and feel of real gold at a fraction of the cost — perfect for daily wear and festive occasions.</p>
        </div>
        <div className="about-visual">
          <div className="about-features">
            {[['🏅','Premium Quality','Thick gold plating that lasts'],['🎁','Gift Packing','Beautiful boxes for gifting'],['🚚','Fast Delivery','Delivered to your doorstep'],['💬','Easy Orders','Order via WhatsApp instantly']].map(([icon,title,text]) => (
              <div className="feature-item" key={title}><div className="feature-icon">{icon}</div><div className="feature-title">{title}</div><div className="feature-text">{text}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="section contact">
        <div className="contact-inner">
          <div>
            <div className="contact-title">Visit us or <span>reach out</span></div>
            <div className="contact-details">
              <div className="contact-row"><span className="contact-icon">📍</span><span>Nakshatra 1 Gram Jewels, Hyderabad, Telangana</span></div>
             <div className="contact-row"><span className="contact-icon">📞</span><span>+91 8073332355</span></div>
              <div className="contact-row"><span className="contact-icon">🕐</span><span>Mon – Sat, 10:00 AM – 8:00 PM</span></div>
            </div>
            <a className="wa-big" href={'https://wa.me/' + WA_NUMBER} target="_blank" rel="noopener noreferrer">📱 Chat on WhatsApp</a>
          </div>
          <div className="map-placeholder"><span style={{fontSize:28}}>🗺️</span><span>Google Maps</span></div>
        </div>
      </div>
      <Footer />
    </>
  );
}