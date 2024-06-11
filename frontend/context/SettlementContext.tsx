import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { Settlement } from "../types/settlement";

interface SettlementContextType {
  amount: number;
  status: "PENDING" | "DISPUTE" | "SETTLED" | "";
  lastModifiedBy: "A" | "B" | "";
  setAmount: (amount: number) => void;
  updateStatus: (status: "PENDING" | "DISPUTE" | "SETTLED" | "") => void;
  modifyAmount: (newAmount: number) => void;
}

const defaultValue: SettlementContextType = {
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
  const [id, setId] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<"PENDING" | "DISPUTE" | "SETTLED" | "">(
    ""
  );
  const [lastModifiedBy, setLastModifiedBy] = useState<"A" | "B" | "">("");

  useEffect(() => {
    const fetchSettlement = async () => {
      try {
        const response: AxiosResponse<Settlement> = await axios.get(
          "http://localhost:3001/settlement"
        );
        const { id, amount, status, lastModifiedBy } = response.data;
        setId(id ?? null);
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
      if (id) {
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
        setId(id ?? null);
        setAmount(amount);
        setStatus(status);
        setLastModifiedBy(lastModifiedBy);
      }
    } catch (error) {
      console.error("Error updating settlement:", error);
    }
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
      const {
        amount: updatedAmount,
        status: updatedStatus,
        lastModifiedBy: updatedLastModifiedBy,
      } = response.data;
      setAmount(updatedAmount);
      setStatus(updatedStatus);
      setLastModifiedBy(updatedLastModifiedBy);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <SettlementContext.Provider
      value={{
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
