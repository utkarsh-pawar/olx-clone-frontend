const baseURL = process.env.REACT_APP_BASE_URL;
const links = {
  getAllItems: `${baseURL}/item/getallitems`,
  addItem: `${baseURL}/item/additem`,
  myItems: `${baseURL}/item/myitems`,
  verifyUser: `${baseURL}/user/verify`,
  login: `${baseURL}/user/login`,
  signup: `${baseURL}/user/signup`,
  getSingleItem: `${baseURL}/item/getitem`,
  buyItem: `${baseURL}/item/buyitem`,
  itemsBought: `${baseURL}/item/itemsbought`,
};

export default links;
