import axios from "axios";

const instance = axios.create({
  timeout: 10000
});

instance.interceptors.response.use(
  function(response) {
    console.log("Response Interceptor", response.status, response);
    switch (response.status) {
      case 200:
        if (response.data && response.data.hasError) {
          return Promise.reject(response.data.errorMessage);
        } else {
          return Promise.resolve(response.data);
        }
      default:
        return response;
    }
  },
  function(error) {
    console.log("inside error", error);
    // Do something with response error
    return Promise.reject(error);
  }
);

class Api {
  constructor(instance) {
    this.axiosIns = instance;
  }

  request(options) {
    console.log("request", options);
    return this.axiosIns.request(options);
  }

  get(url, params, header = {}) {
    return this.request({
      url,
      method: "GET",
      params
    });
  }
}

export default new Api(instance);
