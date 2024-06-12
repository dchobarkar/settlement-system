import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { Settlement } from "../types/settlement";

interface SettlementContextType {
  id: number;
  amount: number;
  status: "PENDING" | "DISPUTE" | "SETTLED" | "";
  lastModifiedBy: "A" | "B" | "";
  setAmount: (amount: number) => void;
  updateStatus: (status: "PENDING" | "DISPUTE" | "SETTLED" | "") => void;
  modifyAmount: (newAmount: number) => void;
}

const defaultValue: SettlementContextType = {
  id: -1,
  amount: 0,
  status: "",
  lastModifiedBy: "",
  setAmount: () => {},
  updateStatus: () => {},
  modifyAmount: () => {},
};

export const SettlementContext =
  createContext<SettlementContextType>(defaultValue);

const SettlementProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<number>(-1);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<"PENDING" | "DISPUTE" | "SETTLED" | "">(
    ""
  );
  const [lastModifiedBy, setLastModifiedBy] = useState<"A" | "B" | "">("");
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    const fetchSettlement = async () => {
      try {
        const response: AxiosResponse<Settlement> = await axios.get(
          "http://localhost:3001/settlement"
        );
        const { id, amount, status, lastModifiedBy } = response.data;
        setId(id);
        setAmount(amount);
        setStatus(status);
        setLastModifiedBy(lastModifiedBy);
      } catch (error) {
        console.error("Error fetching settlement:", error);
      }
    };

    fetchSettlement();
  }, []);

  const modifyAmount = async (newAmount: number) => {
    try {
      const response: AxiosResponse<Settlement> = await axios.get(
        "http://localhost:3001/settlement/"
      );
      const { status, lastModifiedBy: updatedModifiedBy } = response.data;
      if (lastModifiedBy === "A" && updatedModifiedBy === "") {
        alert(
          "Party B has already settled the transaction. Fetch the latest status before modifying."
        );
        return;
      }
      setStatus(status);
      if (updatedModifiedBy === "B" && !showPrompt) {
        alert(
          "Party B has already responded. Fetch the latest status before modifying."
        );
        setShowPrompt(true);
        return;
      }
    } catch (error) {
      console.error("Error fetching settlement:", error);
    }

    try {
      if (id != -1) {
        const response: AxiosResponse<Settlement> = await axios.patch(
          `http://localhost:3001/settlement/${id}`,
          {
            amount: newAmount,
            status: "PENDING",
            lastModifiedBy: "A",
          }
        );
        const { amount, status, lastModifiedBy } = response.data;
        setAmount(amount);
        setStatus(status);
        setLastModifiedBy(lastModifiedBy);
      } else {
        const response: AxiosResponse<Settlement> = await axios.post(
          "http://localhost:3001/settlement",
          {
            amount: newAmount,
            status: "PENDING",
            lastModifiedBy: "A",
          }
        );
        const { id, amount, status, lastModifiedBy } = response.data;
        setId(id);
        setAmount(amount);
        setStatus(status);
        setLastModifiedBy(lastModifiedBy);
      }
    } catch (error) {
      console.error("Error updating settlement:", error);
    }
    setShowPrompt(false);
  };

  const updateStatus = async (
    newStatus: "PENDING" | "DISPUTE" | "SETTLED" | ""
  ) => {
    try {
      const response: AxiosResponse<Settlement> = await axios.patch(
        `http://localhost:3001/settlement/${id}`,
        {
          amount,
          status: newStatus,
          lastModifiedBy: "B",
        }
      );
      setAmount(response.data.amount);
      setStatus(response.data.status);
      setLastModifiedBy(response.data.lastModifiedBy);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <SettlementContext.Provider
      value={{
        id,
        amount,
        status,
        lastModifiedBy,
        setAmount,
        updateStatus,
        modifyAmount,
      }}
    >
      {children}
    </SettlementContext.Provider>
  );
};

export default SettlementProvider;
