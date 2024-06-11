import React, { createContext, useState, ReactNode } from "react";

interface SettlementContextType {
  amount: number;
  status: "PENDING" | "DISPUTE" | "SETTLED" | "";
  setAmount: (amount: number) => void;
  setStatus: (status: "PENDING" | "DISPUTE" | "SETTLED" | "") => void;
  modifyAmount: (newAmount: number) => void;
}

const defaultValue: SettlementContextType = {
  amount: 0,
  status: "",
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

  const modifyAmount = (newAmount: number) => {
    setAmount(newAmount);
    setStatus("PENDING");
  };

  return (
    <SettlementContext.Provider
      value={{ amount, status, setAmount, setStatus, modifyAmount }}
    >
      {children}
    </SettlementContext.Provider>
  );
};

export default SettlementProvider;
