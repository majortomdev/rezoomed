// import axios from "axios";

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem("accessToken");
//       window.location.href = "/login";
//     }
//     console.log("IIIIIIIIIIIIINNNNNNNNTTTTTTTTTTTTEEEEEEEEEEEEEErceptor");
//     return Promise.reject(error);
//   }
// );

// export default axios;

// import axios from "axios";

// axios.interceptors.response.use(
//   (response) => {
//     console.log("Response inteeeeeeeeercepted:", response);
//     return response;
//   },
//   (error) => {
//     console.log("Error intercepttttttttttted:", error);
//     return Promise.reject(error);
//   }
// );

// export default axios;

import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosX = axios.create();

axiosX.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.log("Token expired or unauthorized. Logging out...");
      // Log the user out
      localStorage.removeItem("accessToken");
      // Navigate to the login page
      //useNavigate("/login");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosX;
