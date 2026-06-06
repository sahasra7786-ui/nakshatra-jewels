import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const WA_NUMBER = '918073332355';
// Replace with your actual Google Maps embed URL
const MAP_EMBED = 'https://maps.google.com/maps?q=Hyderabad+Telangana&output=embed';

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-title">Get in <span>Touch</span></div>
        <p style={{fontSize:13, color:'var(--ink-soft)', marginBottom:40}}>We'd love to hear from you. Visit us in store or reach out via WhatsApp.</p>
        <div className="contact-grid">
          <div>
            <div className="contact-card">
              <div className="contact-card-title">Store Information</div>
              <div className="contact-details">
                <div className="contact-row"><span className="contact-icon">📍</span><span>Nakshatra 1 Gram Jewels<br/>Hyderabad, Telangana</span></div>
                <div className="contact-row"><span className="contact-icon">📞</span><span>918073332355</span></div>
                <div className="contact-row"><span className="contact-icon">🕐</span><span>Monday – Saturday<br/>10:00 AM – 8:00 PM</span></div>
                <div className="contact-row"><span className="contact-icon">📅</span><span>Sunday: 11:00 AM – 6:00 PM</span></div>
              </div>
              <a className="wa-big" href={'https://wa.me/' + WA_NUMBER} target="_blank" rel="noopener noreferrer">📱 Order on WhatsApp</a>
            </div>
          </div>
          <div>
            <iframe
              className="map-embed"
              src={MAP_EMBED}
              title="Store Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}