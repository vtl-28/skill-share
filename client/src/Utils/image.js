import axios from "axios"

export function uploadImage(data){
    return axios.post("https://api.cloudinary.com/v1_1/dd1jqwp94/image/upload", data)
    .then(response => {
      console.log(response.data)
      return response.data
    }).catch(error => {
      
      return error.response.data
    })
}