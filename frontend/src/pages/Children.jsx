import { useEffect, useState } from "react";
import API from "../services/api";

const Children = () => {
  const [children, setChildren] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
  });

  // FETCH children
  const fetchChildren = async () => {
    try {
      const res = await API.get("/children");
      setChildren(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD child
  const addChild = async (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.gender) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/children", {
        ...form,
        age: Number(form.age),
      });

      setForm({
        name: "",
        age: "",
        gender: "",
      });

      fetchChildren();
    } catch (error) {
      console.log("Add child error:", error);
      alert(
        error?.response?.data?.message ||
        "Failed to add child"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Children List</h2>

      <form
        onSubmit={addChild}
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button type="submit">Add Child</button>
      </form>

      <h3>All Children</h3>

      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date Admitted</th>
          </tr>
        </thead>

        <tbody>
          {children.map((child) => (
            <tr key={child._id}>
              <td>{child.name}</td>
              <td>{child.age}</td>
              <td>{child.gender}</td>
              <td>
                {child.admissionDate
                  ? new Date(child.admissionDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Children;