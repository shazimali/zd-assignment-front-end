import axios from 'axios';
class UserDataService {
  getAll(page,itemPerPage) {
     return axios.get("/users?page="+page,{params:{'itemPerPage':itemPerPage}});
  }
  store(data) {
    return axios.post("/users/store/", data);
  }
  edit(id) {
    return axios.get(`/users/edit/${id}`);
  }
  update(id, data) {
    return axios.put(`/users/update/${id}`, data);
  }
  delete(id) {
    return axios.delete(`/users/destroy/${id}`);
  }
}

export default new UserDataService();
