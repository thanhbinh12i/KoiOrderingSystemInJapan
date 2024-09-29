import { get, post } from "../utils/request";

export const viewAllVariety = async () => {
      return await get("koi-variable/view-all");
}
export const viewVarietyById = async (id) => {
      return await get(`koi-variable/view-all/${id}`);
}
export const createVaritety = async (values) => {
      return await post('koi-variable/create', values);
}