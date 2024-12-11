import { assocPath } from "ramda";
import dataJson from "../data/LandingPage/data.json";

export const setDeep = (data,path,value) => {
  return assocPath(path.split("."), value)(data)
};

export const getData = () => {
  return dataJson;
};
