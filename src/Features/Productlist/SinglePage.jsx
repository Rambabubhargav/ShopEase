import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const SinglePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    async function singleProduct() {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/${id}`
        );

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    singleProduct();
  }, [id]);

  // ================= CART =================

  const addToCart = async () => {
    try {
      if (!user) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      const existing = await axios.get(
        `https://shopease-yonq.onrender.com/cart?userId=${user.id}&productId=${product.id}`
      );

      if (existing.data.length > 0) {
        const item = existing.data[0];

        await axios.patch(
          `https://shopease-yonq.onrender.com/cart/${item.id}`,
          {
            quantity: item.quantity + 1,
          }
        );
      } else {
        await axios.post(
          "https://shopease-yonq.onrender.com/cart",
          {
            userId: user.id,
            productId: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          }
        );
      }

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      alert("Added To Cart 🛒");
    } catch (error) {
      console.log(error);
      alert("Failed to add product to cart");
    }
  };

  // ================= WISHLIST =================

  const addToWishlist = async () => {
    try {
      if (!user) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      const existing = await axios.get(
        `https://shopease-yonq.onrender.com/wishlist?userId=${user.id}&productId=${product.id}`
      );

      if (existing.data.length > 0) {
        alert("Already in Wishlist ❤️");
        return;
      }

      await axios.post(
        "https://shopease-yonq.onrender.com/wishlist",
        {
          userId: user.id,
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        }
      );

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.log(error);
      alert("Failed to add to wishlist");
    }
  };

  // ================= BUY NOW =================

  const buyNow = async () => {
    try {
      if (!user) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://shopease-yonq.onrender.com/orders",
        {
          userId: user.id,
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
          status: "Pending",
          orderDate: new Date().toLocaleDateString(),
        }
      );

      alert("Order Placed Successfully 🎉");

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        <div className="col-md-5 text-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid shadow rounded"
            style={{
              height: "400px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="col-md-7">

          <h1 className="fw-bold">
            {product.title}
          </h1>

          <p className="text-muted">
            {product.description}
          </p>

          <h2 className="text-success mb-3">
            ${product.price}
          </h2>

          <p>
            <strong>⭐ Rating:</strong>{" "}
            {product.rating}
          </p>

          <p>
            <strong>🏷 Brand:</strong>{" "}
            {product.brand}
          </p>

          <p>
            <strong>📦 Category:</strong>{" "}
            {product.category}
          </p>

          <div className="mt-4">

            <button
              className="btn btn-warning me-2"
              onClick={addToCart}
            >
              🛒 Add To Cart
            </button>

            <button
              className="btn btn-danger me-2"
              onClick={addToWishlist}
            >
              ❤️ Wishlist
            </button>

            <button
              className="btn btn-success"
              onClick={buyNow}
            >
              ⚡ Buy Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};