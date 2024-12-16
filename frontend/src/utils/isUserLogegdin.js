import {jwtDecode} from "jwt-decode";

function isUserLoggedIn() {
  const token = localStorage.getItem("token");

  if (!token) {

    //console.log("No token found");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    //console.log("Decoded token:", decoded);

    // Checking token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      //console.log("Token has expired");
      return false;
    }

    return true; // Token is valid (not expired, and exists)
  } catch (err) {
    //console.log("Error decoding token:", err.message);
    localStorage.removeItem('token');
    return false;
  }
}

export default isUserLoggedIn;
