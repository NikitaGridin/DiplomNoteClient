import axios from "axios";
import userStore from "../store/userStore";

// Регистрация
export const createUser = async (data) => {
  try {
    const formData = new FormData();
    formData.append("nickname", data.nickname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_repeat", data.passwordRepeat);
    formData.append("img", data.img);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}auth/sign-in`,
      formData,
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

//Подтверждение аккаунта
export const activateUser = async (code) => {
  const data = { code };
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}auth/activate`,
      data
    );
    localStorage.setItem("token", res.data.accesToken);
    userStore.setUser(res.data.user);
    console.log(userStore.userData);
  } catch (error) {
    throw error;
  }
};

// Авторизация
export const loginReq = async (nickname, password) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}auth/log-in`,
      { nickname, password },
      { withCredentials: true }
    );
    localStorage.setItem("token", res.data.accesToken);
    userStore.setUser(res.data.user);
    return res;
  } catch (error) {
    throw error;
  }
};

//logout
export const logoutReq = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    userStore.setUser(res.data.user);
    return res;
  } catch (error) {
    throw error;
  }
};

export const auditionReq = async (idUser, idTrack) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}audition/add`,
      {
        idUser,
        idTrack,
      }
    );
  } catch (error) {
    console.log(error?.response?.data);
  }
};

export const addToLibrayReq = async (url, userId, trackId, setIsAdded) => {
  try {
    const { data } = await axios.post(`${url}/${userId}/${trackId}`);
    setIsAdded(true);
  } catch (error) {
    console.log(error?.response?.data);
  }
};
