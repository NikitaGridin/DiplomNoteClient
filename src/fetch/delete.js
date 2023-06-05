import axios from "axios";

export const deleteFromLibrayReq = async (url, hidden, trackId, setIsAdded) => {
  try {
    const { data } = await axios.delete(`${url}`);
    setIsAdded(false);
    if (hidden) {
      hidden(trackId);
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteTrackReq = async (url, hidden, trackId, setIsAdded) => {
  try {
    const { data } = await axios.delete(`${url}`);
    setIsAdded(false);
    if (hidden) {
      hidden(trackId);
    }
  } catch (error) {
    console.log(error);
  }
};
