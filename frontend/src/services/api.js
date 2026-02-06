// Ye file frontend ka gateway hai backend ke liye.
// Components kabhi direct fetch() / axios() use nahi karte — sab yahin se hota hai

const BASE_URL = "http://localhost:3000/api";

//token handling
//Har protected request me token auto-attach hona chahiye.

function getToken() {
  return localStorage.getItem("token");
}
// Generic request handler
async function request(method, endpoint, data = null, isAuth = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Attach token if route is protected
  if (isAuth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Something went wrong");
  }

  return result;
}

//
// AUTH APIs
//
export function signupUser(data) {
  return request("POST", "/auth/signup", data);
}

export function verifyOtp(data) {
  return request("POST", "/auth/verify-otp", data);
}

export function loginUser(data) {
  return request("POST", "/auth/login", data);
}

//resend otp 
export function resendOtp(email) {
  return request("POST", "/auth/resend-otp", { email });
}

//
// APPLICATION APIs (Protected)
//
export function getApplications() {
  return request("GET", "/applications", null, true);
}

export function createApplication(data) {
  return request("POST", "/applications", data, true);
}

export function updateApplication(id, data) {
  return request("PUT", `/applications/${id}`, data, true);
}

export function deleteApplication(id) {
  return request("DELETE", `/applications/${id}`, null, true);
}

//
// OPPORTUNITY APIs (Protected)
//
export function getOpportunities() {
  return request("GET", "/opportunities", null, true);
}

export function createOpportunity(data) {
  return request("POST", "/opportunities", data, true);
}

export function updateOpportunity(id, data) {
  return request("PUT", `/opportunities/${id}`, data, true);
}

export function deleteOpportunity(id) {
  return request("DELETE", `/opportunities/${id}`, null, true);
}
