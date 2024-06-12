import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";

import { SettlementContext } from "../context/SettlementContext";

const PartyA = () => {
  const { amount, status, modifyAmount, lastModifiedBy } =
    useContext(SettlementContext);
  const [newAmount, setNewAmount] = useState<number | "">(amount || "");
  const [isModified, setIsModified] = useState<boolean>(false);

  useEffect(() => {
    setNewAmount(amount || "");
  }, [amount]);

  const handleSubmit = () => {
    modifyAmount(Number(newAmount));
    setIsModified(false);
  };

  const handleEdit = () => {
    setIsModified(!isModified);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Party A</h2>

      {status ? (
        <>
          <div className="mb-4">
            <h3 className="text-xl">Transaction Status: {status}</h3>

            {status !== "SETTLED" && (
              <div>
                <p>Amount: {amount}</p>
                {isModified ? (
                  <div>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) =>
                        setNewAmount(
                          e.target.value !== "" ? Number(e.target.value) : ""
                        )
                      }
                      className="border p-2 mb-4 w-full text-black"
                    />

                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 text-white p-2 rounded w-full"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-gray-500 text-white p-2 rounded w-full"
                  >
                    Edit
                  </button>
                )}

                <Link href="/party-b">
                  <p className="bg-blue-500 text-white p-2 rounded w-full mt-2 block text-center">
                    Go to Party B
                  </p>
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <input
            type="number"
            value={newAmount}
            onChange={(e) =>
              setNewAmount(e.target.value !== "" ? Number(e.target.value) : "")
            }
            className="border p-2 mb-4 w-full text-black"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default PartyA;
