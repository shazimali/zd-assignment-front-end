import axios from 'axios';
class TransactionDataService {
  getAll(page,itemPerPage,user_id,user_type,search_id) {
     return axios.get("/tasks?page="+page,{params:{
        'itemPerPage':itemPerPage,
        'user_id':user_id,
        'type':user_type,
        'search_id':search_id,
    }});
  }
  getAllWorkers(data) {
    return axios.get("/tasks/workers", data);
  }
  store(data) {

    let formData = new FormData();
    formData.append('title', data['title']);
    formData.append('user_id', data['user_id']);
    formData.append('image_path', data['image_path']);
    formData.append('desc', data['desc']);

    return axios.post("/tasks/store", formData);
  }
  edit(id) {
    return axios.get(`/tasks/edit/${id}`);
  }
  update(id, data) {

    let formData = new FormData();
    formData.append('title', data['title']);
    formData.append('user_id', data['user_id']);
    formData.append('image_path', data['image_path']);
    formData.append('desc', data['desc']);
    formData.append('_method', 'PUT');

    return axios.post(`/tasks/update/${id}`, formData);
  }

  delete(id) {
    return axios.delete(`/tasks/destroy/${id}`);
  }

  updateStatus(id, data) {
    return axios.put(`/tasks/status/${id}`, data);
  }
}

export default new TransactionDataService();
