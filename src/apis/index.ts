import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_DEV_BASE_URL,
  baseURL: "https://test-uimx.onrender.com",
});

const excludeAuthorization = ["/login", "/signup", "/"];

// instance.interceptors.request.use(
//   (config) => {
//     const includeAuthorizationToken =
//       window.location.pathname === "/" ||
//       excludeAuthorization.includes(window.location.pathname);

//     if (!includeAuthorizationToken) {
//       //   config.headers["Authorization"] = `Bearer getItemInLocalStorage("token")`;
//       // config.headers.Cookie = document.cookie;
//     }
//     //config.headers["Access-Control-Allow-Origin"] = "*";

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(
      error.response && error.response.data ? error.response.data : error
    );
  }
);
export const Axios = instance;
