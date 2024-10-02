import axios from "axios";
// import toast from "react-hot-toast";

const API = {
  appointment: "appointment",
};

const getAPIUrl = (url) => {
  if (Array.isArray(url)) {
    let workUrl = url[0];
    url.shift();
    url = API[workUrl] + "/" + url.join("/") + "/";
  } else url = API[url];
  return url;
};

const axioInstance = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});

axioInstance.interceptors.request.use(async (request) => {
  request.url = getAPIUrl(request.url);
  return request;
});

axioInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // const status = error.response.status;
    // if (typeof window !== "undefined") {
    //   if (status === 401) {
    //     toast.error("Session Expired, Please login again");
    //     window.location.href = "/logout";
    //   } else if (status === 403) {
    //     toast.error("You are not authorized to perform this action");
    //   } else if (status === 404) {
    //     toast.error("Page Not found");
    //   } else if (status === 400) {
    //     let show = true;
    //     try {
    //       const rda = JSON.parse(error.config.data);
    //       if (error.config.url === "discount/apply/" && rda.data.code == "")
    //         show = false;
    //     } catch (e) {}
    //     if (show) {
    //       toast.error(error.response?.data?.error?.message);
    //     }
    //   } else if (status === 405) {
    //     toast.error("Method Not allowed");
    //   } else if (status > 400 && status <= 500) {
    //     toast.error("Some error occured");
    //   } else if (status >= 500) {
    //     toast.error("Internal Server Error");
    //   }
    // }
    throw error;
  }
);
// @ts-ignore
const axiosFireApi = async (url, method = "get", data = {}) => {
  method = method.toLowerCase();
  let allData = {
    url,
    method,
  };
  if (method === "get") {
    allData["params"] = data;
  } else if (method === "post" || method === "patch" || method === "put") {
    allData["data"] = data;
  }
  try {
    const result = await axioInstance(allData);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.log("ERROR", error.response.data.error);
    return {
      success: false,
      error: error.response.data.error,
    };
  }
};

export { axioInstance, axiosFireApi };
