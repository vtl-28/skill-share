import axios from "axios";

export function registerHost(data) {
  return axios
    .post("/api/user/signup", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function loginHost(data) {
  const { email, password } = data;
  return axios
    .post("/api/user/login", { email, password })
    .then((response) => {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      localStorage.setItem("jwt", JSON.stringify(response.data.token));
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function fetchHost(id) {
  return axios
    .get(`/api/user/${id}`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
export function updateHost(id, userDataToUpdate) {
  return axios
    .put(`/api/user/edit/${id}`, userDataToUpdate, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
