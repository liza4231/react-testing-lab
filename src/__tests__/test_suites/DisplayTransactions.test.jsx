import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";

describe("Display Transactions", () => {
  const mockTransactions = [
    {
      id: 1,
      date: "2026-02-01",
      description: "Paycheck",
      category: "Income",
      amount: 1000.0,
    },
    {
      id: 2,
      date: "2026-02-02",
      description: "Groceries",
      category: "Food",
      amount: 45.25,
    },
  ];

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("displays transactions on startup", async () => {
    render(<App />);

    // confirm fetch was called for initial load
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith("http://localhost:6001/transactions");

    // wait for at least one transaction to show up
    await waitFor(() => {
      expect(screen.getByText("Paycheck")).toBeInTheDocument();
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });
  });
});
