import axios from "axios";

export const signUp = async (user) => {
  const response = await axios.post("http://localhost:5000/api/signUp", user, {
    withCredentials: true,
  });
  return response.data;
};

export const logIn = async (user) => {
  const response = await axios.post("http://localhost:5000/api/login", user, {
    withCredentials: true,
  });
  return response.data;
};

export const logOut = async () => {
  await axios.get("http://localhost:5000/api/logOut", {
    withCredentials: true,
  });
  return;
};
