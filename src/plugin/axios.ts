import Axios from "axios";

/*
 * Axios.create
 * this is a function that creates a new instance of Axios.
 *
 * Parameters {objet} :
 * baseURL is the base URL of the API that we are going to use.
 */

const BASE_URL = "https://recruitment.dev.rollingglory.com";

const axios = Axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export { axios };
