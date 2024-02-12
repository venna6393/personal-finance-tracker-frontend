// src/services/api.js
const API_BASE_URL = "http://localhost:5000/api";

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }

  const data = await response.json();
  return data.token;
};

export const getTransactions = async (token) => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch transactions");
  }

  return response.json();
};
