import axios from "axios";

export function fetchTalks() {
  return axios
    .get("/api/talks/list", {
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
export function fetchHostTalks(_id) {
  return axios
    .get(`/api/user/talks/${_id}`, {
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
export function addHostTalk(data) {
  return axios
    .post("/api/talks/addTalk", data, {
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

export function fetchTalk(id) {
  return axios
    .get(`/api/talks/${id}`, {
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

export function searchTalk(search) {
  return axios
    .get(`/api/talks/searchTalk?search=${search}`, {
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

export function updateHostTalk(id, talkDataToUpdate) {
  return axios
    .put(`/api/talks/edit/${id}`, talkDataToUpdate, {
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

export function likeTalk(_id) {
  return axios
    .put(
      `/api/talks/like`,
      {
        talkId: _id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function unlikeTalk(_id) {
  return axios
    .put(
      `/api/talks/unlike`,
      {
        talkId: _id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function commentTalk(_id, data) {
  return axios
    .put(`api/talks/comment/${_id}`, data, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
}

export function attendTalk(_id) {
  return axios
    .put(
      `/api/talks/attend`,
      {
        talkId: _id,
      },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function cancelTalk(_id) {
  return axios
    .put(
      `/api/talks/cancel`,
      {
        talkId: _id,
      },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export function fetchAttendedTalks(_id) {
  return axios
    .get(`/api/user/bookedTalks/${_id}`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("jwt").replace(/"/g, ""),
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
