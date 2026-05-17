import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../components/StatsCard";
import FinanceChart from "../components/FinanceChart";

const Dashboard = () => {
  const [donations, setDonations] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationRes = await axios.get(
          "http://localhost:5000/api/donations",
        );
        const expenseRes = await axios.get(
          "http://localhost:5000/api/expenses",
        );

        const totalDonations = donationRes.data.reduce(
          (sum, item) => sum + item.amount,
          0,
        );

        const totalExpenses = expenseRes.data.reduce(
          (sum, item) => sum + item.amount,
          0,
        );

        setDonations(totalDonations);
        setExpenses(totalExpenses);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const balance = donations - expenses;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Donations" amount={donations} />
        <StatsCard title="Total Expenses" amount={expenses} />
        <StatsCard title="Balance" amount={balance} />
      </div>

      <FinanceChart donations={donations} expenses={expenses} />
    </div>
  );
};

export default Dashboard;
