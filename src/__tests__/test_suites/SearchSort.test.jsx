import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../../components/Search";
import Sort from "../../components/Sort";

describe("Search and Sort", () => {
  it("triggers a change event on Search and calls setSearch with the typed value", async () => {
    const user = userEvent.setup();
    const setSearch = vi.fn();

    render(<Search setSearch={setSearch} />);

    const input = screen.getByPlaceholderText(/search your recent transactions/i);
    await user.type(input, "gro");

    // called multiple times (g, gr, gro) - just confirm last call has full string
    expect(setSearch).toHaveBeenCalled();
    expect(setSearch).toHaveBeenLastCalledWith("gro");
  });

  it("triggers a change event on Sort and calls onSort with the selected value", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(<Sort onSort={onSort} />);

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "category");
    expect(onSort).toHaveBeenCalledWith("category");

    await user.selectOptions(select, "description");
    expect(onSort).toHaveBeenCalledWith("description");
  });
});