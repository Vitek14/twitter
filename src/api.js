import axios from 'axios';
import profile from "./components/profile/Profile.jsx";

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';
let token = localStorage.getItem('token');
axios.defaults.headers.common['x-auth-token'] = token;

const updateToken = () => {
  token = localStorage.getItem('token');
  axios.defaults.headers.common['x-auth-token'] = token;
};

const Profile = {
  get: () => axios.get("/profile/")
}

const Notifications = {
  get: () => axios.get("/notifications/")
}

const Posts = {
  create_post: (body) => axios.post("/user_posts", body)
}

export default {
  Profile,
  Notifications,
  Posts
}
