import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

export const Header = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  const user =
    JSON.parse(localStorage.getItem("currentUser")) || null;

  const fetchCartCount = async () => {
    try {
      if (!user) {
        setCartCount(0);
        return;
      }

      const res = await axios.get(
        `http://localhost:3001/cart?userId=${user.id}`
      );

      const totalQty = res.data.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(totalQty);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartCount();

    const updateCart = () => {
      fetchCartCount();
    };

    window.addEventListener(
      "cartUpdated",
      updateCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCart
      );
    };
  }, [user]);

  const logout = () => {
    localStorage.removeItem("currentUser");

    setCartCount(0);

    alert("Logged Out Successfully");

    navigate("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/home"
        >
          ShopEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="nav"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/home"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
              >
                Products
              </Link>
            </li>

            {user && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link position-relative"
                  to="/cart"
                >
                  <FaShoppingCart size={22} />

                  <span
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                  >
                    {cartCount}
                  </span>
                </Link>
              </li>
            )}

            {user ? (
              <li className="nav-item dropdown">

                <a
                  href="/"
                  onClick={(e) =>
                    e.preventDefault()
                  }
                  className="nav-link dropdown-toggle text-light"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FaUserCircle
                    className="me-2"
                    size={22}
                  />
                  {user.name}
                </a>

                <ul className="dropdown-menu dropdown-menu-end shadow">

                  <li className="text-center p-3">

                    <FaUserCircle
                      size={50}
                      className="mb-2 text-secondary"
                    />

                    <h6 className="mb-0">
                      {user.name}
                    </h6>

                    <small className="text-muted">
                      {user.email}
                    </small>

                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                    >
                      👤 My Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/orders"
                    >
                      📦 My Orders
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/wishlist"
                    >
                      ❤️ Wishlist
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={logout}
                    >
                      🚪 Logout
                    </button>
                  </li>

                </ul>

              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-warning ms-2"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
};