import axios from "axios";
import {
  SIGNIN_SUCCESS,
  SIGNOUT,
  ALL_EVENTS_SUCCESS,
  EVENT_DETAIL_SUCCESS,
  ONGOING_EVENTS_SUCCESS,
} from "./admin.constants";

export const loginGoogle = (response) => async (dispatch) => {
  try {
    // const { data } = await axios.post(
    //   "http://10.10.4.26:5000/api/admin/signin",
    //   {
    //     response,
    //   }
    // );
    dispatch({ type: SIGNIN_SUCCESS, payload: response });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://10.10.4.26:5000/api/admin/events");
    dispatch({ type: ALL_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllEvents", error);
  }
};

export const getOngoingEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://10.10.4.26:5000/api/admin/eventshappeningnow"
    );
    dispatch({ type: ONGOING_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllEvents", error);
  }
};

export const getEventDetail = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://10.10.4.26:5000/api/admin/event/${id}`
    );
    dispatch({ type: EVENT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    console.log("getEventDetail", error);
  }
};

export const signout = () => (dispatch) => {
  // localStorage.clear();
  dispatch({ type: SIGNOUT });
};
