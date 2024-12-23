import {jwtDecode} from "jwt-decode";

function getUserNameFromToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return "";
    }

    return decoded.sub;
  } catch (err) {

    localStorage.removeItem('token');
    return "";
  }
}

export default getUserNameFromToken;