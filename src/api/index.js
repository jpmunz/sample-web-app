export default class API {
  _fetch(url, options) {
    return fetch(
      process.env.REACT_APP_API_HOST + url,
      Object.assign(
        {
          // Set options common to all your API calls here
          headers: {
            "Content-Type": "application/json"
          }
        },
        options
      )
    ).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    });
  }

  fetchFooValue() {
    // TODO: implement backend
    // return this._fetch("/v1/foo/");
    return new Promise((resolve, reject) => {
      window.setTimeout(() => resolve({ value: "fetched value" }), 1000);
    });
  }
}
