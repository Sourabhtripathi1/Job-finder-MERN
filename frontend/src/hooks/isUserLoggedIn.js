import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export function isUserLoggedIn() {
  const token = Cookies.get("token");

  if (!token) {
    toast.error("Please login to continue.");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded?.user?.user) {
      return true;
    } else {
      toast.error("Please login to continue.");
      return false;
    }
  } catch (error) {
    console.error("Invalid token", error);
    toast.error("Session expired!. Please login again.");
    return false;
  }
}
