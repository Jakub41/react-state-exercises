class BasicApi {
  constructor() {
    this.token = btoa("user25" + ":" + "gX7HF4hYaYyJAzpt");
    this.domain = "strive-school-testing-apis.herokuapp.com/api";

    this.protocol = "https";
    this.credentials = {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + this.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    this.url = `${this.protocol}://${this.domain}`;
  }
}

export default BasicApi;
