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

import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    console.log("Response inteeeeeeeeercepted:", response); // This should log
    return response;
  },
  (error) => {
    console.log("Error intercepttttttttttted:", error); // This should log
    return Promise.reject(error);
  }
);

export default axios;
