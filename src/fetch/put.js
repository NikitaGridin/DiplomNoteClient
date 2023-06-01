import axios from "axios";

export const changeCoauthorStatus = async (
  url,
  userId,
  trackId,
  status,
  setAction,
  action,
  delOn
) => {
  try {
    const { data } = await axios.put(url, {
      userId,
      trackId,
      status,
    });
    setAction(!action);
    if (delOn) {
      delOn(trackId);
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};
