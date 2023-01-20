import axios from "axios";

const config = {
    headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }
}

export function registerHost(data, setIsLoading, setSuccessMessage, toggleSuccessToast, setErrorMessage, toggleErrorToast){
    return axios.post('/user/signup', data)
    .then(response => {
            setIsLoading(false);
            setSuccessMessage("Sign up successful")
            toggleSuccessToast();
            localStorage.setItem("userInfo", JSON.stringify(response.data));
    
    }).catch(error => {
        setIsLoading(false);
        setErrorMessage(error.response.data)
        toggleErrorToast();
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
    return axios.get('/api/talks/list', config).then(response => {
       return response.data;      
    }).catch(error => {
        return error.response.data;
    })

  }
  export function fetchHostTalks(_id){
    return axios.get(`/api/user/talks/${_id}`, config).then(response => {
       return response.data;      
    }).catch(error => {
        return error.response.data;
    })
}
export function addHostTalk(data){
    return axios.post('/api/talks/addTalk', data, config)
    .then(response => {
            return response.data
    }).catch(error => {
        return error.response.data
    })
}

export function uploadImage(data){
    return axios.post("https://api.cloudinary.com/v1_1/dd1jqwp94/image/upload", data)
    .then(response => {
      
      return response.data
    }).catch(error => {
      
      return error.response.data
    })
}
export function fetchUser(id){
    return axios.get(`/api/user/${id}`, config).then(response => {
      //console.log(response.data)
       return response.data;      
    }).catch(error => {
        return error.response.data;
    })
  }
  export function updateHost(id, userDataToUpdate){
    return axios.put(`/api/user/edit/${id}`, userDataToUpdate, config).then(response => {
        console.log(response.data)
        console.log(typeof response.data)
        return response.data   
    }).catch(error => {
        console.log(error.response.data)
        return error.response.data;   
    })
  }