import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="nav-logo">
        Nakshatra <span>1 Gram</span> Jewels
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/catalog" className={({ isActive }) => isActive ? 'active' : ''}>Catalog</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
        <NavLink to="/catalog" className="nav-cta">Order Now</NavLink>
      </div>
    </nav>
  );
}