import axios from "axios";
import {
  SIGNIN_SUCCESS,
  SIGNOUT,
  ALL_EVENTS_SUCCESS,
  EVENT_DETAIL_SUCCESS,
  ONGOING_EVENTS_SUCCESS,
  UPDATE_SUCCESS,
  TOKEN_SUCCESS,
  SCAN_QR,
} from "./admin.constants";

// const API_URL = "http://10.10.5.151:5000";
const API_URL = "http://192.168.100.14:5000";

// 192.168.100.14

axios.defaults.withCredentials = true;

export const setTokens = (tokens) => async (dispatch) => {
  try {
    dispatch({ type: TOKEN_SUCCESS, payload: tokens });
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const googleLogin = (userInfo, tokens) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/admin/auth/expo`, {
      data: userInfo,
      tokens: tokens,
    });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    // navigation.navigate("home");
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const loginGoogle = (response) => async (dispatch) => {
  try {
    // const { data } = await axios.post(
    //   "http://10.10.4.26:5000/api/admin/signin",
    //   {
    //     response,
    //   }
    // );
    dispatch({ type: SIGNIN_SUCCESS, payload: response });
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/events`);
    dispatch({ type: ALL_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllEvents", error);
  }
};

export const getOngoingEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/eventshappeningnow`);
    dispatch({ type: ONGOING_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllEvents", error);
  }
};

export const getEventDetail = (id) => async (dispatch, getState) => {
  const {
    login: { auth, tokens },
  } = getState();
  try {
    const { data } = await axios.post(
      `${API_URL}/api/admin/expo/event/${id}`,
      {
        refreshToken: tokens.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      }
    );
    dispatch({ type: EVENT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    console.log("getEventDetail", error);
  }
};

export const scanQR = (res, eventId) => async (dispatch, getState) => {
  try {
    const { data } = await axios
      .post(`${API_URL}/api/admin/scanqr`, {
        email: res?.[0],
        eventId: res?.[1],
        id: eventId,
      })
      .then((d) => {
        alert("Qrcode Scanned Successfully");
      })
      .catch((err) => {
        if (err.message.includes(401)) {
          alert("QR Code is Already Scanned");
        }
        if (err.message.includes(404)) {
          alert("You are not invited to this event");
        }
      });
    dispatch({ type: SCAN_QR, payload: data });
  } catch (error) {
    console.log("scanQR", error);
  }
};

export const signout = () => (dispatch) => {
  dispatch({ type: SIGNOUT });
};

export const updateSuccess = () => async (dispatch) => {
  dispatch({
    type: UPDATE_SUCCESS,
    payload: false,
  });
};
