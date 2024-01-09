import axios from "axios";

const customaxios = axios.create({
    baseURL: 'https://2f5a-222-108-73-38.ngrok-free.app',
    headers:{
        
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        'Accept': 'application/json'
    }
})

export default customaxios;