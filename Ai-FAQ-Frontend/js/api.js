// Backend connection layer - keep Gemini API keys on the backend only.
const API_BASE = localStorage.getItem("apiBaseUrl") || "http://localhost:5000";

async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";

  const token = localStorage.getItem("authToken");
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  let data = {};
  try { data = await response.json(); } catch (_) {}

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
    throw new Error(data.message || "Request failed");
  }
  return data;
}

async function login(email, password) {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  saveSession(data.data);
  return data.data;
}

async function register(name, email, password) {
  const data = await apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
  saveSession(data.data);
  return data.data;
}

async function askAI(question) {
  return apiRequest("/api/ai/answer", {
    method: "POST",
    body: JSON.stringify({ question })
  });
}

async function getProfile() {
  return apiRequest("/api/auth/profile");
}

function saveSession(user) {
  localStorage.setItem("authToken", user.token);
  localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
  try { return JSON.parse(localStorage.getItem("user") || "null"); } catch (_) { return null; }
}

function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  location.hash = "#/";
}
