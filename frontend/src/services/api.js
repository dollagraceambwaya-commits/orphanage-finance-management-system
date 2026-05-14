import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// AUTH
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// DONATIONS
export const addDonation = (data) =>
  API.post("/donations", data);

export const getDonations = () =>
  API.get("/donations");

// EXPENSES
export const addExpense = (data) =>
  API.post("/expenses", data);

export const getExpenses = () =>
  API.get("/expenses");

// CHILDREN
export const addChild = (data) =>
  API.post("/children", data);

export const getChildren = () =>
  API.get("/children");

// SUMMARY
export const getSummary = () =>
  API.get("/summary");

export default API;