import React, { useState } from "react";
import { useFirebase } from "../firebase"; // Import the Firebase context
import MultiSelect from "multiselect-react-dropdown"; // Import MultiSelect component
import RoleTable from "./RoleTable";

const AddRole = () => {
  const { addRole } = useFirebase(); // Access addRole function from Firebase context
  const [roleName, setRoleName] = useState("");
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [roleAdded, setRoleAdded] = useState(false); // State to track if role was added

  // Static list of available routes
  const availableRoutes = [
    { path: "/", name: "HOME" },
    { path: "/users", name: "Users" },
    { path: "/roles", name: "Roles" },
    { path: "/login", name: "Login" },
    { path: "/demostory1", name: "DemoStory1" },
  ];

  const handleSubmit = async (e) => {
    setRoleAdded(false);
    e.preventDefault();
    const routePaths = selectedRoutes.map((route) => route.path);
    console.log(routePaths);
    const result = await addRole(roleName, routePaths);
    if (result.success) {
      setRoleName("");
      setSelectedRoutes([]);
      setRoleAdded(true); 
      alert("Role Added Successfully")
    } else {
      console.error("Error adding role:", result.error);
    }
  };

  return (
    <div className="add-role-wrap">
      <div className="add-role">
        <h2>Add Role</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="roleName">Role Name</label>
            <input
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </div>
          <div className="multi-select">
            <label htmlFor="routes">Routes</label>
            <MultiSelect
              options={availableRoutes}
              selectedValues={selectedRoutes}
              onSelect={setSelectedRoutes}
              onRemove={setSelectedRoutes}
              displayValue="name"
              showCheckbox={true}
              placeholder="Select Routes"
              closeIcon="cancel"
              avoidHighlightFirstOption={true}
            />
          </div>
          <button type="submit" className="addrolebtn">
            Add Role
          </button>
        </form>
      </div>
      <div className="roletable">
        <RoleTable key={roleAdded ? "refresh" : "initial"} />
      </div>
    </div>
  );
};

export default AddRole;
