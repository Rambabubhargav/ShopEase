import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://shopease-yonq.onrender.com/orders?userId=${user.id}`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">

      <h2 className="text-center fw-bold mb-4">
        📦 My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center mt-5">

          <h4>No Orders Found</h4>

          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>

        </div>
      ) : (
        orders.map((item) => (
          <div
            key={item.id}
            className="card shadow border-0 mb-4"
          >
            <div className="row g-0">

              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="img-fluid p-3"
                  style={{
                    height: "180px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="col-md-9">
                <div className="card-body">

                  <h5 className="fw-bold">
                    {item.title}
                  </h5>

                  <p className="mb-2">
                    <strong>Price:</strong> $
                    {item.price}
                  </p>

                  <p className="mb-2">
                    <strong>Quantity:</strong>{" "}
                    {item.quantity}
                  </p>

                  <p className="mb-2">
                    <strong>Order Date:</strong>{" "}
                    {item.orderDate}
                  </p>

                  <span className="badge bg-success fs-6">
                    {item.status || "Delivered"}
                  </span>

                </div>
              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
};