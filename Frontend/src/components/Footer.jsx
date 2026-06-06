import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <NavLink to="/" className="footer-logo">Nakshatra <span>1 Gram</span> Jewels</NavLink>
      <div className="footer-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
      <div className="footer-copy">© 2025 Nakshatra 1 Gram Jewels</div>
    </footer>
  );
}