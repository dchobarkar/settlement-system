import React, { createContext, useState, ReactNode } from "react";

interface SettlementContextType {
  amount: number;
  status: "PENDING" | "DISPUTE" | "SETTLED" | "";
  lastModifiedBy: "A" | "B" | "";
  setAmount: (amount: number) => void;
  setStatus: (status: "PENDING" | "DISPUTE" | "SETTLED" | "") => void;
  modifyAmount: (newAmount: number) => void;
}

const defaultValue: SettlementContextType = {
  amount: 0,
  status: "",
  lastModifiedBy: "",
  setAmount: () => {},
  setStatus: () => {},
  modifyAmount: () => {},
};

export const SettlementContext =
  createContext<SettlementContextType>(defaultValue);

const SettlementProvider = ({ children }: { children: ReactNode }) => {
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<"PENDING" | "DISPUTE" | "SETTLED" | "">(
    ""
  );
  const [lastModifiedBy, setLastModifiedBy] = useState<"A" | "B" | "">("");

  const modifyAmount = (newAmount: number) => {
    setAmount(newAmount);
    setStatus("PENDING");
    setLastModifiedBy("A");
  };

  const updateStatus = (newStatus: "PENDING" | "DISPUTE" | "SETTLED" | "") => {
    setStatus(newStatus);
    setLastModifiedBy("B");
  };

  return (
    <SettlementContext.Provider
      value={{
        amount,
        status,
        lastModifiedBy,
        setAmount,
        setStatus: updateStatus,
        modifyAmount,
      }}
    >
      {children}
    </SettlementContext.Provider>
  );
};

export default SettlementProvider;
