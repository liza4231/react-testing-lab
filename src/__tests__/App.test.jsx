import './test_suites/AddTransactions.test'
import './test_suites/DisplayTransactions.test'
import './test_suites/SearchSort.test'

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

import "./test_suites/AddTransactions.test";
import "./test_suites/DisplayTransactions.test";
import "./test_suites/SearchSort.test";

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("renders the bank title", () => {
    render(<App />);
    expect(screen.getByText(/the royal bank of flatiron/i)).toBeInTheDocument();
  });
});