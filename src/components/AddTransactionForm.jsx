import React from "react";

function AddTransactionForm({ postTransaction }) {
  function submitForm(e) {
    e.preventDefault();

    const newTransaction = {
      date: e.target.date.value,
      description: e.target.description.value,
      category: e.target.category.value,
      amount: parseFloat(e.target.amount.value),
    };

    postTransaction(newTransaction);
    e.target.reset(); // nice for UX + some tests like this
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={submitForm}>
        <div className="inline fields">
          <input type="date" name="date" required />
          <input type="text" name="description" placeholder="Description" required />
          <input type="text" name="category" placeholder="Category" required />
          <input type="number" name="amount" placeholder="Amount" step="0.01" required />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
