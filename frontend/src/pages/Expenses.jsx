import { useEffect, useState } from "react";
import { addExpense, getExpenses, getDonations } from "../services/api";
import Balance from "../components/Balance";

function Expenses() {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    description: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [donations, setDonations] = useState([]);

  const loadExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [expRes, incRes] = await Promise.all([
        getExpenses(),
        getDonations(),
      ]);
      setExpenses(expRes.data);
      setDonations(incRes.data);
    };
    fetchData();
  }, []);

  // Add expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) return;
    try {
      await addExpense({
        ...form,
        amount: Number(form.amount),
      });
      setForm({ category: "", amount: "", description: "" });
      loadExpenses();
    } catch (error) {
      console.log("Add expense error:", error);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
      });
      loadExpenses();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div>
      <h1>Expenses</h1>

      {/* BALANCE COMPONENT */}
      <Balance expenses={expenses} donations={donations} />

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category (e.g. Food, Medical)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <br />
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <br />
        <input
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br />
        <button type="submit">Add Expense</button>
      </form>

      {/* LIST */}
      <h3>Expense List</h3>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <ul>
          {expenses.map((exp) => (
            <li key={exp._id}>
              <strong>{exp.category}</strong> — KES {exp.amount}
              {exp.description && ` — ${exp.description}`}
              <button
                onClick={() => handleDelete(exp._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Expenses;
