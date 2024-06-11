import React, { useContext } from "react";
import Link from "next/link";

import { SettlementContext } from "../context/SettlementContext";

const PartyB = () => {
  const { amount, status, setStatus, lastModifiedBy } =
    useContext(SettlementContext);

  const handleResponse = (response: "DISPUTE" | "SETTLED") => {
    setStatus(response);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Party B</h2>

      {status && (
        <div className="mb-4">
          <p>Current Amount: {amount}</p>

          {status === "PENDING" && (
            <>
              <button
                onClick={() => handleResponse("SETTLED")}
                className="bg-green-500 text-white p-2 rounded w-full mb-2"
              >
                Agree
              </button>

              <button
                onClick={() => handleResponse("DISPUTE")}
                className="bg-red-500 text-white p-2 rounded w-full"
              >
                Dispute
              </button>
            </>
          )}

          <Link href="/party-a">
            <p className="bg-blue-500 text-white p-2 rounded w-full mt-2 block text-center">
              Go to Party A
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PartyB;
