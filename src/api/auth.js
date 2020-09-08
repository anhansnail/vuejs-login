import request from "../utils/request";
import {API} from "../utils/abc"
export default {
  login (params) {
    return request.post('/login', params)
  }
}
