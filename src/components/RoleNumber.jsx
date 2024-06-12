import React, { useState, useEffect } from "react";
import { useFirebase } from "../firebase";
import { TailSpin } from "react-loader-spinner";

const RoleNumber = () => {
  const { getRoles } = useFirebase();
  const [totalRoles, setTotalRoles] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalRoles = async () => {
      try {
        setLoading(true);
        const rolesData = await getRoles();
        setTotalRoles(rolesData.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching total roles:", error);
        setLoading(false);
      }
    };
    fetchTotalRoles();
  }, [getRoles]);

  return (
    <div className="numbercont">
      {loading ? (
        <div className="loader">
          <TailSpin
            height={20}
            width={20}
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
          />
        </div>
      ) : (
        <div className="totalrolebox">
          <div className="totaldiv">Total Roles</div>
          <div className="totaldivnum">{totalRoles}</div>
        </div>
      )}
    </div>
  );
};

export default RoleNumber;
