import { useEffect, useState } from "react";
import { addExpense, getExpenses } from "../services/api";
import API from "../services/api";

function Expenses() {
  const [form, setForm] = useState({
    category: "",
    amount: 0,
    description: "",
  });

  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExpense({
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        category: "",
        amount: 0,
        description: "",
      });

      loadExpenses();
    } catch (error) {
      console.log("Add expense error:", error);
    }
  };

  // ✅ FIXED DELETE (use API instead of fetch)
  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      loadExpenses();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div>
      <h1>Expenses</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <br />

        <button type="submit">Add Expense</button>
      </form>

      <h3>Expense List</h3>

      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.category} - Ksh {exp.amount} — {exp.description}

            <button
              onClick={() => handleDelete(exp._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;