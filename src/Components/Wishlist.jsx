import axios from "axios";
import { useEffect, useState } from "react";

export const Wishlist = () => {
  const [wishlist, setWishlist] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/wishlist?userId=${user.id}`
      );

      setWishlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
    await axios.delete(
      `http://localhost:3001/wishlist/${id}`
    );

    fetchWishlist();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        My Wishlist
      </h2>

      <div className="row">

        {wishlist.length === 0 ? (
          <h4 className="text-center">
            Wishlist Empty
          </h4>
        ) : (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="col-md-4 mb-4"
            >
              <div className="card h-100 shadow">

                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="card-img-top p-3"
                  style={{
                    height: "220px",
                    objectFit: "contain",
                  }}
                />

                <div className="card-body text-center">

                  <h5>{item.title}</h5>

                  <p>${item.price}</p>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      removeWishlist(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};