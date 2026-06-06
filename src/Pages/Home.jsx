import "../Pages/Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="hero-title">ShopEase</h1>

          <p className="hero-subtitle">
            Experience premium shopping with elegance, quality,
            and convenience all in one place.
          </p>

          <button
            className="explore-btn"
            onClick={() => navigate("/products")}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container text-center">
          <h2>Crafted For Modern Shopping</h2>

          <p>
            Discover a refined shopping experience designed
            to bring together style, convenience, and trust.
            Every detail is crafted to make your journey
            smooth and enjoyable.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            Why Choose Us
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h4>Fast Delivery</h4>
                <p>
                  Reliable and quick shipping for every
                  order.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h4>Secure Payments</h4>
                <p>
                  Safe transactions with trusted payment
                  methods.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">⭐</div>
                <h4>Premium Quality</h4>
                <p>
                  Carefully selected products that meet
                  high standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Start Your Shopping Journey</h2>

          <p>
            Discover quality products and exclusive offers.
          </p>

          <button
            className="shop-btn"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </section>

      
    </>
  );
};