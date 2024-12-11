import { assocPath } from "ramda";
import objectJson from "../data/LandingPage/object.json";

export const setDeep = (obj,path,value) => {
  return assocPath(path.split("."), value)(obj)
};

export const getData = () => {
  return objectJson;
};
