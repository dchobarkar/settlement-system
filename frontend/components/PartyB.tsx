import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { SettlementContext } from "../context/SettlementContext";

const PartyB = () => {
  const { amount, status, setStatus, lastModifiedBy } =
    useContext(SettlementContext);
  const [localStatus, setLocalStatus] = useState<
    "" | "PENDING" | "DISPUTE" | "SETTLED"
  >(status);
  const [currentAmount, setCurrentAmount] = useState(amount);
  const [currentStatus, setCurrentStatus] = useState<
    "" | "PENDING" | "DISPUTE" | "SETTLED"
  >(status);

  // Polling interval in milliseconds
  const POLLING_INTERVAL = 3000;

  useEffect(() => {
    // Polling function to check for updates
    const poll = async () => {
      try {
        const response: AxiosResponse<{
          amount: number;
          status: "" | "PENDING" | "DISPUTE" | "SETTLED";
          lastModifiedBy: string;
        }> = await axios.get("http://localhost:3001/settlement");
        const { amount, status } = response.data;
        setCurrentAmount(amount);
        setCurrentStatus(status);
      } catch (error) {
        console.error("Error fetching settlement:", error);
      }
    };

    // Set up polling interval
    const intervalId = setInterval(poll, POLLING_INTERVAL);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [status, localStatus]);

  const handleResponse = async (response: "DISPUTE" | "SETTLED") => {
    await setStatus(response);
    // Fetch the updated data after setting the status
    try {
      const response: AxiosResponse<{
        amount: number;
        status: "" | "PENDING" | "DISPUTE" | "SETTLED";
        lastModifiedBy: string;
      }> = await axios.get("http://localhost:3001/settlement");
      const { amount, status } = response.data;
      setCurrentAmount(amount);
      setCurrentStatus(status);
    } catch (error) {
      console.error("Error fetching settlement:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Party B</h2>

      {currentStatus && (
        <div className="mb-4">
          <p>Current Amount: {currentAmount}</p>

          {currentStatus === "PENDING" && (
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
