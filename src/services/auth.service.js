import Client from "@/config/Client";

export const handleLogin = async (payload) => {
  try {
    const res = await Client.post("/api/auth/login", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleResgiter = async (payload) => {
  try {
    const res = await Client.post("/api/auth/resgiter", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleLogout = async () => {
  try {
    const res = await Client.get("/api/auth/logout");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetProfile = async () => {
  try {
    const res = await Client.get("/api/auth/profile");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleRefreshToken = async (payload) => {
  try {
    const res = await Client.post(`/api/auth/refeshtoken`, payload);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (payload) => {
  try {
    const data = await Client.post(`/api/user`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const handleChangePassword = async (payload) => {
  try {
    const data = await Client.post(`/api/auth/password`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const handleLoginWithGoogle = async () => {
  try {
    const res = await Client.get(`/auth/google`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleLoginWithGoogleCallback = async (query) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API}/auth/google/callback${query}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const handleForgotPas = async (payload) => {
  try {
    const res = await Client.post(`/auth/forgot`, payload);
    return res;
  } catch (error) {
    console.error(error);
  }
};
