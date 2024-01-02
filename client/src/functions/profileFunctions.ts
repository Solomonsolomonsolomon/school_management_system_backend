import { useNavigate } from "react-router-dom";

const getUserData = (user: any) => {
  const data = sessionStorage.getItem(user);
  if (!data) {
    return {};
  }
  return JSON.parse(data);
};
const user = getUserData("user");
let Navigate = useNavigate();

const logout = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
  // location.href='/'
  Navigate("/", { replace: true });
};

const toggle = () => {
  const profile = document.getElementById("profile");
  profile?.classList.toggle("hidden");
};

export default {
  user,
  logout,
  toggle,
} as const;
