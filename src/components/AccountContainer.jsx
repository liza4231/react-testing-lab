import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => {
        // use functional update so state is never stale in tests
        setTransactions((prev) => [...prev, data]);
      });
  }

  function deleteTransaction(id) {
    fetch(`http://localhost:6001/transactions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    });
  }

  // Sort function here
  function onSort(sortBy) {
    setTransactions((prev) => {
      const copy = [...prev];
      copy.sort((a, b) => {
        const aVal = (a[sortBy] ?? "").toString().toLowerCase();
        const bVal = (b[sortBy] ?? "").toString().toLowerCase();
        return aVal.localeCompare(bVal);
      });
      return copy;
    });
  }

  // Filter using search here and pass new variable down
  const filteredTransactions = transactions.filter((t) => {
    const term = search.toLowerCase();
    return (
      t.description.toLowerCase().includes(term) ||
      t.category.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
      />
    </div>
  );
}

export default AccountContainer;
