import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer HPOmbmKP0Fuz7eY62zUV8JQPjDC7TZimDQYwQM3tjHBRng-CmGbb9ZjdPLxDzWLnfQbGJVfh6u_hbrw1YysJIRHm-LtH8XQ1JjqUUcGbR28PkN_4x7pJEHYxZmpSYHYx",
  }
});