export let get = (http, url, callback) => {
  http.get(url).then((res) => {
    callback(res.data);
  });
}

export let post = (http, url, data, callback) => {
  http.post(url, data).then((res) => {
    callback(res.data);
  });
}