import axios from 'axios';
import token from '../helpers/token';

const instance = () =>
  axios.create({
    headers: { authorization: token.getToken() },
  });
export default instance;
