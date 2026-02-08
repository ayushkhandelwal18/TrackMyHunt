// Ye file frontend ka gateway hai backend ke liye.
// Components kabhi direct fetch() / axios() use nahi karte — sab yahin se hota hai

const BASE_URL = `${import.meta.env.VITE_BASE_BACKEND_URL}/api`;


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

// Wake up the server (Cold Start Mitigation)
export function wakeUpServer() {
  return fetch(`${BASE_URL}/`);
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

export function googleLogin(token) {
  return request("POST", "/auth/google", { token });
}

export function updateProfile(data) {
  return request("PUT", "/user/profile", data, true);
}

export function changePassword(data) {
  return request("PUT", "/user/password", data, true);
}

export function deleteAccount(data) {
  return request("DELETE", "/user/account", data, true);
}

//resend otp 
export function resendOtp(email) {
  return request("POST", "/auth/resend-otp", { email });
}

export function forgotPassword(email) {
  return request("POST", "/auth/forgot-password", { email });
}

export function resetPassword(data) {
  return request("POST", "/auth/reset-password", data);
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

//
// SKILL APIs (Protected)
//
export function getSkills() {
  return request("GET", "/skills", null, true);
}

export function createSkill(data) {
  return request("POST", "/skills", data, true);
}

export function updateSkill(id, data) {
  return request("PUT", `/skills/${id}`, data, true);
}

export function deleteSkill(id) {
  return request("DELETE", `/skills/${id}`, null, true);
}

//
// RESOURCE APIs (Protected)
//
export function getResources() {
  return request("GET", "/resources", null, true);
}

export function createResource(data) {
  return request("POST", "/resources", data, true);
}

export function updateResource(id, data) {
  return request("PUT", `/resources/${id}`, data, true);
}

export function deleteResource(id) {
  return request("DELETE", `/resources/${id}`, null, true);
}

//
// NOTE APIs (Protected)
//
export function getNotes() {
  return request("GET", "/notes", null, true);
}

export function createNote(data) {
  return request("POST", "/notes", data, true);
}

export function updateNote(id, data) {
  return request("PUT", `/notes/${id}`, data, true);
}

export function deleteNote(id) {
  return request("DELETE", `/notes/${id}`, null, true);
}

//
// DASHBOARD
//
export function getDashboardStats() {
  return request("GET", "/dashboard", null, true);
}


//
// RESUME APIs (Protected)
//
export function getResumes() {
  return request("GET", "/resumes", null, true);
}

export function addResume(data) {
  return request("POST", "/resumes", data, true);
}

export function deleteResume(id) {
  return request("DELETE", `/resumes/${id}`, null, true);
}

export function updateResume(id, data) {
  return request("PUT", `/resumes/${id}`, data, true);
}
