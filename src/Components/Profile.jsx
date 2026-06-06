export const Profile = () => {
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

  return (
    <div className="container mt-5">
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body text-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            width="120"
            className="mb-3"
          />

          <h2>{user.name}</h2>

          <hr />

          <div className="text-start">

            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Mobile:</strong> {user.mobile}
            </p>

            <p>
              <strong>User ID:</strong> {user.id}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};