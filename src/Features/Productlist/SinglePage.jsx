import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

export const SinglePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  let navigate = useNavigate();

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
        `http://localhost:3001/cart?userId=${user.id}&productId=${product.id}`
      );

      if (existing.data.length > 0) {
        const item = existing.data[0];

        await axios.patch(
          `http://localhost:3001/cart/${item.id}`,
          {
            quantity: item.quantity + 1,
          }
        );
      } else {
        await axios.post(
          "http://localhost:3001/cart",
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
    }
  };

  // ================= WISHLIST =================
  const addToWishlist = async () => {
    try {
      if (!user) {
        alert("Please Login First");
        return;
      }

      const existing = await axios.get(
        `http://localhost:3001/wishlist?userId=${user.id}&productId=${product.id}`
      );

      if (existing.data.length > 0) {
        alert("Already in Wishlist ❤️");
        return;
      }

      await axios.post(
        "http://localhost:3001/wishlist",
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
        "http://localhost:3001/orders",
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        <div className="col-md-5 text-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid"
            style={{
              height: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="col-md-6">

          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h3 className="text-success">
            Price: ${product.price}
          </h3>

          <h5>⭐ Rating: {product.rating}</h5>
          <h5>🏷 Brand: {product.brand}</h5>
          <h5>📦 Category: {product.category}</h5>

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