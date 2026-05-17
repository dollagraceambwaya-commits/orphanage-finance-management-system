import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.category || !expense.amount) return;

    const response = await fetch("http://localhost:5000/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: expense.category,
        amount: Number(expense.amount),
        description: expense.description,
      }),
    });

    const savedExpense = await response.json();
    onAddExpense(savedExpense);
    setExpense({ category: "", amount: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      <input
        type="text"
        placeholder="Category (e.g. Food, Medical)"
        value={expense.category}
        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={expense.description}
        onChange={(e) =>
          setExpense({ ...expense, description: e.target.value })
        }
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
