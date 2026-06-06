import axios from "axios";
import { useEffect, useState } from "react";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h3>Please Login First</h3>
      </div>
    );
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/cart?userId=${user.id}`
      );

      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (item) => {
    try {
      await axios.patch(
        `http://localhost:3001/cart/${item.id}`,
        {
          quantity: item.quantity + 1,
        }
      );

      fetchCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (item) => {
    try {
      if (item.quantity > 1) {
        await axios.patch(
          `http://localhost:3001/cart/${item.id}`,
          {
            quantity: item.quantity - 1,
          }
        );

        fetchCart();

        window.dispatchEvent(
          new Event("cartUpdated")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/cart/${id}`
      );

      fetchCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const orderNow = async () => {
    try {
      for (let item of cartItems) {
        await axios.post(
          "http://localhost:3001/orders",
          {
            ...item,
            status: "Pending",
            orderDate:
              new Date().toLocaleDateString(),
          }
        );

        await axios.delete(
          `http://localhost:3001/cart/${item.id}`
        );
      }

      alert("Order Placed Successfully");

      fetchCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const grandTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4>Your Cart is Empty</h4>
        </div>
      ) : (
        <div className="row">

          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 shadow-sm"
              >
                <div className="row g-0 align-items-center">

                  <div className="col-md-3 text-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid p-3"
                      style={{
                        maxHeight: "180px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="col-md-9">
                    <div className="card-body">

                      <h5>{item.title}</h5>

                      <p>
                        Price:
                        <strong className="ms-2">
                          ${item.price}
                        </strong>
                      </p>

                      <div className="d-flex align-items-center mb-3">

                        <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                            decreaseQty(item)
                          }
                        >
                          -
                        </button>

                        <span className="mx-3 fw-bold">
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-outline-success"
                          onClick={() =>
                            increaseQty(item)
                          }
                        >
                          +
                        </button>

                      </div>

                      <p>
                        Item Total:
                        <strong className="text-success ms-2">
                          $
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(2)}
                        </strong>
                      </p>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        Remove Item
                      </button>

                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div
              className="card shadow-sm p-4"
              style={{
                position: "sticky",
                top: "20px",
              }}
            >
              <h4 className="mb-4">
                Order Summary
              </h4>

              <div className="d-flex justify-content-between mb-3">
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <strong>
                  ${grandTotal.toFixed(2)}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Delivery</span>
                <strong className="text-success">
                  Free
                </strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h5>Total Amount</h5>

                <h5 className="text-success">
                  ${grandTotal.toFixed(2)}
                </h5>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={orderNow}
              >
                Order Now
              </button>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};