import axios from "axios";

// const config = {
//     headers: {
//         'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
//     }
// }

export function registerHost(data, setIsLoading, setSuccessMessage, toggleSuccessToast, setErrorMessage, toggleErrorToast){
    return axios.post('/api/user/signup', data)
    .then(response => {
        return response.data;      
    }).catch(error => {
        return error.response.data; 
    })
}
export function loginHost(data){
    const { email, password } = data;
    return axios.post('/api/user/login', { email, password})
    .then(response => {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("jwt", JSON.stringify(response.data.token));
        return response.data;
    }).catch(error => {
        return error.response.data;
    })
}
export function fetchTalks(){
    return axios.get('/api/talks/list', { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
       return response.data;      
    }).catch(error => {
        return error.response.data;
    })

  }
  export function fetchHostTalks(_id){
    return axios.get(`/api/user/talks/${_id}`, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
       return response.data;      
    }).catch(error => {
        return error.response.data;
    })
}
export function addHostTalk(data){
    return axios.post('/api/talks/addTalk', data, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }})
    .then(response => {
            return response.data
    }).catch(error => {
        return error.response.data
    })
}

export function uploadImage(data){
    return axios.post("https://api.cloudinary.com/v1_1/dd1jqwp94/image/upload", data)
    .then(response => {
      console.log(response.data)
      return response.data
    }).catch(error => {
      
      return error.response.data
    })
}
export function fetchUser(id){
    return axios.get(`/api/user/${id}`, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
       return response.data;      
    }).catch(error => {
        return error.response.data;
    })
  }
  export function updateHost(id, userDataToUpdate){
    return axios.put(`/api/user/edit/${id}`, userDataToUpdate, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        return response.data   
    }).catch(error => {
        return error.response.data;   
    })
  }
  export function getTalk(id){
    return axios.get(`/api/talks/${id}`,{ headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        return response.data   
    }).catch(error => {
        return error.response.data;   
    })
  }

  export function searchTalk(search){
    return axios.get(`/api/talks/searchTalk?search=${search}`,  {
      headers: {
          'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
      }
      }).then(response => {
        return response.data
      }).catch(error => {
        return error.response.data
      })
  }

  export function updateUserTalk(id, talkDataToUpdate){
    return axios.put(`/api/talks/edit/${id}`, talkDataToUpdate, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        return response.data   
    }).catch(error => {
        return error.response.data;   
    })
  }

  export function like(_id){
    return axios.put(`/api/talks/like`, {
     talkId: _id}, { 
        headers: {
            "Content-Type":"application/json",
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }
}).then(response => {
        return response.data
    }).catch(error => {
        return error.response.data
    })
  }

  export function unlike(_id){
    return axios.put(`/api/talks/unlike`, {
        talkId: _id
    }, { headers: {
        "Content-Type":"application/json",
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        return response.data
    }).catch(error => {
        return error.response.data
    })
  }

  export function comment(_id, data){
    return axios.put(`api/talks/comment/${_id}`, data, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        console.log(response.data)
        return response.data;       
    }).catch(error => {
        console.log(error.response.data)
        return error.response.data
    })
  }

  export function attendTalk(_id){
    return axios.put(`/api/talks/attend`, {
        talkId: _id
    }, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        return response.data;       
    }).catch(error => {
        return error.response.data
    })
  }

  export function cancelTalk(_id){
    return axios.put(`/api/talks/cancel`, {
        talkId: _id
    }, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        return response.data;       
    }).catch(error => {
        return error.response.data
    })
  }

  export function getAttendedTalks(_id){
    return axios.get(`/api/user/bookedTalks/${_id}`, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        console.log(response.data)
        return response.data;       
    }).catch(error => {
        return error.response.data
    })
  }
  