import { handleLogout, handleRefreshToken } from "@/services/auth.service";
import Config from "./Config";
import Cookies from "js-cookie";

const { SERVER_API } = Config;
const Client = {
  serverApi: SERVER_API,
  token: Cookies?.get("accessToken"),
  setUrl: function (url) {
    this.serverApi = url;
  },
  setToken: function (token) {
    this.token = token;
  },
  send: async function (url, method = "GET", body = null) {
    // url = SERVER_API + url;
    url = `${this.serverApi}${url}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (this.token && response.status === 401) {
      const payload = {
        refreshToken: Cookies.get("refreshToken"),
      };
      try {
        const res = await handleRefreshToken(payload);
        if (res?.data?.status === 200) {
          this.token = res?.data?.data?.access_token;
          Cookies.set("accessToken", res?.data?.data?.access_token, {
            expires: 60 * 60 * 24 * 7,
          });
          Cookies.set("refreshToken", res?.data?.data?.refresh_token, {
            expires: 60 * 60 * 24 * 30,
          });
          return this.send("/api/auth/profile", method, body);
        } else {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          return (window.location.href = "/");
        }
      } catch (error) {
        console.log(error);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        return (window.location.href = "/");
      }
    }
    const data = await response.json();

    return { response, data };
  },

  get: function (url) {
    return this.send(url);
  },

  post: function (url, body) {
    return this.send(url, "POST", body);
  },

  put: function (url, body) {
    return this.send(url, "PUT", body);
  },

  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },

  delete: function (url) {
    return this.send(url, "DELETE");
  },
};

export default Client;
// client.setToken(accessToken);
