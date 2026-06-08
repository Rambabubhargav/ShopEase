import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";

export const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Logged Out Successfully");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="card shadow p-5">
          <h3>Please Login First</h3>

          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{
          maxWidth: "700px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <FaUserCircle
              size={120}
              className="text-primary"
            />

            <h2 className="mt-3 fw-bold">
              {user.name}
            </h2>

            <p className="text-muted">
              Customer Account
            </p>
          </div>

          <hr />

          <div className="row mt-4">

            <div className="col-md-6 mb-3">
              <div className="card bg-light border-0">
                <div className="card-body">
                  <FaUserCircle className="me-2 text-primary" />
                  <strong>Name</strong>

                  <p className="mb-0 mt-2">
                    {user.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card bg-light border-0">
                <div className="card-body">
                  <FaEnvelope className="me-2 text-success" />
                  <strong>Email</strong>

                  <p className="mb-0 mt-2">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card bg-light border-0">
                <div className="card-body">
                  <FaPhone className="me-2 text-warning" />
                  <strong>Mobile</strong>

                  <p className="mb-0 mt-2">
                    {user.mobile}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card bg-light border-0">
                <div className="card-body">
                  <FaIdCard className="me-2 text-danger" />
                  <strong>User ID</strong>

                  <p className="mb-0 mt-2">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-4">

            <button
              className="btn btn-danger px-4"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};