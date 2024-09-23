import { post } from "../utils/request";

export const login = async (userIdentifier, password) => {
      return await post('account/login', { UserNameOrEmailOrPhoneNumber: userIdentifier, password });
};
export const register = async (values) => {
      return await post("account/register", values);
}