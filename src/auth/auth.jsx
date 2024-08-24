import axios from "axios";

export const signup = (user) => {
  const { firstName, lastName, email, password } = user;
  return axios
    .post("http://localhost:3100/api/v1/register", {
      firstName,
      lastName,
      email,
      password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const signin = async (email, password) => {
  try {
    // Make the POST request to the login endpoint
    const response = await axios.post(
      "http://localhost:3100/api/v1/login",
      { email, password },
      { headers: { 'Content-Type': 'application/json' } } 
    );
    
    // Save the token if login is successful
    saveToken(response.data.token);

    return {
      valid: true,
      status: response.status,
      message: response.data.message || "Login successful",
    };
  } catch (error) {
    // Handle different types of errors
    const status = error.response ? error.response.status : 400;
    const message = error.response
      ? error.response.data.message || "Invalid username or password"
      : "Network error";

    return {
      valid: false,
      status,
      message,
    };
  }
};

const saveToken = (token) => {
  const data = `Bearer ${token}`;
  window.localStorage.setItem("BulkMail", data);
};

export const getToken = () => {
  return window.localStorage.getItem("BulkMail");
};

export const signout = () => {
  window.localStorage.removeItem("BulkMail");
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("BulkMail")) {
    return true;
  } else {
    return false;
  }
};

export {saveToken};