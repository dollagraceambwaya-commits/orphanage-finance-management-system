function Balance({ expenses, donations }) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalDonations = donations
    ? donations.reduce((sum, don) => sum + don.amount, 0)
    : 0;
  const balance = totalDonations - totalExpenses;

  return (
    <div>
      <h3>Balance Summary</h3>
      <p>Total Donations: KES {totalDonations}</p>
      <p>Total Expenses: KES {totalExpenses}</p>
      <p>
        <strong>Balance: KES {balance}</strong>
      </p>
    </div>
  );
}

export default Balance;
