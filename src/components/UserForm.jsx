import React, { useState, useEffect } from "react";
import { useFirebase } from "../firebase";
import UserTable from "./UserTable";

const RegisterForm = () => {
  const { createUser, getRoles } = useFirebase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [roleAdded, setRoleAdded] = useState(false);
  useEffect(() => {
    const fetchRoles = async () => {
      const rolesList = await getRoles();
      setRoles(rolesList);
    };
    fetchRoles();
  }, [getRoles,name]);


  const handleSubmit = async (e) => {
    setRoleAdded(false);
    e.preventDefault();
    const result = await createUser(email, password, name, mobileNo, role);
    if (result.success) {
      setName("");
      setEmail("");
      setPassword("");
      setMobileNo("");
      setRole("");
      setError("");
      setRoleAdded(true)
      alert("User Registered");
    } else {
      setError(result.error.message);
    }
  };

  return (
    <div className="userformwrap">
      <div className="register">
        <div className="heading">
          <h2>Register</h2>
        </div>
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mobile No</label>
              <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="errmsg">{error}</div>}
            <button type="submit">Add User</button>
          </form>
        </div>
      </div>
      <div className="usetablelist">
          <UserTable key={roleAdded ? "refresh" : "initial"}  />
      </div>
    </div>
  );
};

export default RegisterForm;
