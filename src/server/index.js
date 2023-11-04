import axios from "axios";
import { ENDPOINT } from "../constants";
import { toast } from "react-toastify";

const request = axios.create( {
  baseURL: ENDPOINT,
  timeout: 10000,
} );

request.interceptors.response.use(
  ( response ) => response,
  ( err ) => {
    toast.error( 'Network error', { autoClose: 1000 } );

    return Promise.reject( err );
  }
);

export default request;