import { post } from "../utils/request";

export const login = async (account, password) => {
      return await post('account/login', { account, password });
};
export const register = async (values) => {
      return await post("account/register", values);
}
export const loginGoogle = async (values) => {
      return await post("account/google-login", {token: values});
}