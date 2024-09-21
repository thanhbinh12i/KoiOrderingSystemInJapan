import { post } from "../utils/request";

export const login = async (email, password) => {
      return await post('account/login', { email, password });
};
export const register = async (values) => {
      return await post("account/register", values);
}