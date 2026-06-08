import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `https://shopease-yonq.onrender.com/wishlist?userId=${user.id}`
      );

      setWishlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete(
        `https://shopease-yonq.onrender.com/wishlist/${id}`
      );

      fetchWishlist();

      alert("Removed from Wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">
        ❤️ My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your Wishlist is Empty</h4>

          <button
            className="btn btn-primary mt-3"
            onClick={() =>
              navigate("/products")
            }
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="col-lg-4 col-md-6 mb-4"
            >
              <div className="card h-100 shadow border-0">

                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="card-img-top p-3"
                  style={{
                    height: "250px",
                    objectFit: "contain",
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="card-title">
                    {item.title}
                  </h5>

                  <h4 className="text-success">
                    ${item.price}
                  </h4>

                  <button
                    className="btn btn-danger mt-3 w-100"
                    onClick={() =>
                      removeWishlist(item.id)
                    }
                  >
                    Remove From Wishlist
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};