import Client from "@/config/Client";

export const handleCreateMap = async (payload) => {
  try {
    const res = await Client.post("/api/mindmaps", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleSaveMap = async (id, payload) => {
  try {
    const res = await Client.patch(`/api/mindmaps/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleDeleMap = async (id) => {
  try {
    const res = await Client.delete(`/api/mindmaps/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleDeleMaps = async (payload) => {
  try {
    const res = await Client.post(`/api/delete/mindmaps`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleDeleteRecoveryMapById = async (id) => {
  try {
    const res = await Client.delete(`/api/deleted/mindmaps/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleDeleteRecoveryMapByIds = async (payload) => {
  try {
    const res = await Client.post(`/api/deleted/mindmaps`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleReStoreMapById = async (id) => {
  try {
    const res = await Client.get(`/api/restore/mindmaps/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const handleReStoreMapByIds = async (payload) => {
  try {
    const res = await Client.post(`/api/restore/mindmaps`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};