import React, { useState } from "react";

const PartyA = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [status, setStatus] = useState<"PENDING" | "DISPUTE" | "SETTLED" | "">(
    ""
  );

  const handleSubmit = () => {
    setStatus("PENDING");
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

                <button
                  onClick={() => setStatus("")}
                  className="bg-gray-500 text-white p-2 rounded w-full"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
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
