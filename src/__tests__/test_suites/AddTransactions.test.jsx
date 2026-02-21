import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";

describe("Search and Sort (integration)", () => {
  const mockTransactions = [
    { id: 1, date: "2026-02-01", description: "Paycheck", category: "Income", amount: 1000 },
    { id: 2, date: "2026-02-02", description: "Groceries", category: "Food", amount: 45.25 },
    { id: 3, date: "2026-02-03", description: "Gas", category: "Auto", amount: 30 },
  ];

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockTransactions),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("filters transactions when the search input changes (page updates accordingly)", async () => {
    const user = userEvent.setup();
    render(<App />);

    // wait for initial transactions to appear
    await screen.findByText("Paycheck");
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Gas")).toBeInTheDocument();

    // type into search
    const searchInput = screen.getByPlaceholderText(/search your recent transactions/i);
    await user.type(searchInput, "gro");

    // should show only "Groceries" now
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.queryByText("Paycheck")).not.toBeInTheDocument();
    expect(screen.queryByText("Gas")).not.toBeInTheDocument();
  });
});