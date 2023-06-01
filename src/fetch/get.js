import axios from "axios";

export const searchReq = async (value) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}search/search/${value}`
    );
    return data;
  } catch (error) {
    console.log(error?.response?.data);
  }
};

export const getAllPlaylists = async (page) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}playlist/all/${page}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getElements = async (
  url,
  setElements,
  setCurrentPart,
  currentPart,
  setError
) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}${url}`
    );
    if (data.error) {
      console.log(data.error);
      setError(data.error);
    } else {
      setCurrentPart(currentPart + 1);
      setElements((prevElements) => prevElements.concat(data));
      setError(false);
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};

export const addedTracksReq = async (url, setIsAdded, trackId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}${url}`
    );
    setIsAdded(data.includes(trackId));
  } catch (error) {
    console.log(error?.response?.data);
  }
};
