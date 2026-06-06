import axios from "axios";
import { useEffect, useState } from "react";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/orders?userId=${user.id}`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <h4 className="text-center">
          No Orders Found
        </h4>
      ) : (
        orders.map((item) => (
          <div
            key={item.id}
            className="card mb-3 shadow"
          >
            <div className="row g-0">

              <div className="col-md-3 text-center">
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

                  <h5>{item.title}</h5>

                  <p>
                    Price: ${item.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Order Date:
                    {item.orderDate}
                  </p>

                  <span className="badge bg-success">
                    {item.status}
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