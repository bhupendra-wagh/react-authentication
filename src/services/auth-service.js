import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/";
//const API_URL = "http://localhost/React/instagram/api/"

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login.php", {
        email,
        password
      })
      .then(response => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(fullname, email, password) {
      console.log(fullname);
    return axios.post(API_URL + "register.php" , {
      fullname,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
