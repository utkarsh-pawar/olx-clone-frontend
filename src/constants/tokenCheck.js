import axios from "axios";
import links from "../links/link";
import { userActions } from "../store/userSlice";

const checkIsUser = async (dispatch) => {
  try {
    const authHeader = `Bearer ${localStorage.getItem("token")}`;
    const response = await axios.post(links.verifyUser, null, {
      headers: {
        auth: authHeader,
      },
    });
    if (response.data.isUser) {
      dispatch(userActions.loggedIn());
    }
  } catch (e) {
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log(e.message);
    }
  }
};

export default checkIsUser;
