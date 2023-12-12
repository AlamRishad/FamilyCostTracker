import axios from "axios";
import { API_URL } from "./config";
import { getAccessToken } from "./Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getResponse(token, setToken, url) {
  let response = null;
  try {
    response = await axios.get(API_URL + url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 403) {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const tokenResponse = await getAccessToken(refreshToken);
      if (tokenResponse.status === 200) {
        setToken(tokenResponse.data.access_token);
        response = await axios.get(API_URL + url, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        });
      } else {
        setToken(null);
      }
    }
  } catch (error) {
    return error.response
      ? {
          status: error.response.status,
          data: error.response.data,
        }
      : {
          status: "Network Error.",
          data: "Network Error.",
        };
  }

  return response === null
    ? {
        status: "Error.",
        data: "Error.",
      }
    : {
        status: response.status,
        data: response.data,
      };
}

export default getResponse;
