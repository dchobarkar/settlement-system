export interface Settlement {
  id?: number;
  amount: number;
  status: "PENDING" | "DISPUTE" | "SETTLED" | "";
  lastModifiedBy: "A" | "B" | "";
}
