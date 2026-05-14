import { useEffect, useState } from "react";
import { addDonation, getDonations } from "../services/api";

function Donations() {
  const [form, setForm] = useState({
    source: "",
    amount: "",
    description: "",
  });

  const [donations, setDonations] = useState([]);

  const loadDonations = async () => {
    try {
      const res = await getDonations();
      setDonations(res.data);
    } catch (error) {
      console.error("Error loading donations:", error);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDonation({
        ...form,
        amount: Number(form.amount),
      });

      setForm({ source: "", amount: "", description: "" });
      loadDonations();
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  };

  return (
    <div>
      <h1>Donations</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Source"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
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
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br />

        <button type="submit">Add Donation</button>
      </form>

      <h3>Donation List</h3>
      <ul>
        {donations.map((d) => (
          <li key={d._id}>
            {d.source} - Ksh {d.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Donations;