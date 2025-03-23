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

const Home = {
  get: () => axios.get("/home")
}

const Notifications = {
  create: (body) => axios.post("/notifications/", body),
  get: () => axios.get("/notifications/")
}

const Comments = {
  create: (body) => axios.post("/comments/", body),
  update: (id, body) => axios.patch("/comments/" + id, body),
  delete: (id) => axios.delete("/comments/" + id),
}

const Posts = {
  create_post: (body) => axios.post("/user_posts", body),
  like: (body) => axios.post("/user_posts/like", body),
  unlike: (post_id, user_id) => axios.delete("/user_posts/" + post_id + "/unlike/" + user_id),
}

const Login = {
  login: (body) => axios.post("/login", body),
  sign_up: (body) => axios.post("/sign_up", body),
}

const LoginInfo = {
  create_info: (body) => axios.post("/login_info", body),
  delete_info: (body) => axios.delete("/login_info", body),
}

export default {
  Profile,
  Notifications,
  Posts,
  LoginInfo,
  Home,
  Comments,
  Login,
  updateToken  // Experimental!!!
}
