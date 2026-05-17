function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) return <p>No expenses recorded yet.</p>;

  return (
    <div>
      <h3>Expense Records</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            <strong>{exp.category}</strong> — KES {exp.amount}
            {exp.description && ` — ${exp.description}`}
            <button onClick={() => onDelete(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
