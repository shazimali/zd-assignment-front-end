import axios from "axios";

class AuthDataService {

    login(data) {
        return axios.post("/login",data);
    }

    logout(data){
        return axios.post("/logout",data);
    }
}

export default new AuthDataService();