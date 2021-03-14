// Kytpe Integrate System
import { IUser } from "@src/interfaces/IUser";
import { HttpClient } from "./HttpClient";

const api_domain = "https://wastezero-backend.herokuapp.com/api/v1";

const endpoint = (path) => `${api_domain}/${path}`;

type response<T> = T;
type error = {
  message: string;
};

export type ApiResponse<T> = response<T> | error;

export class Api extends HttpClient {
  public constructor() {
    super(api_domain);
  }

  public login = (body) => {
    return this.instance.post<IUser>("login", body);
  };

  public whoAmI = () => {
    return this.instance.get<IUser>("who_am_i");
  };

  public branches = (page?) => {
    return this.instance.get(`admin_panel/branches?page=${page ? page : 1}`);
  };

  public restaurants = (page?) => {
    return this.instance.get(`admin_panel/restaurants?page=${page ? page : 1}`);
  };

  public managers = (page?) => {
    return this.instance.get(`admin_panel/managers?page=${page ? page : 1}`);
  };

  public foods = (page?) => {
    return this.instance.get(`admin_panel/foods?page=${page ? page : 1}`);
  };

  public orders = (page?) => {
    return this.instance.get(`client/orders?page=${page ? page : 1}`);
  };

  public createOrder = (body) => {
    return this.instance.post(`admin_panel/orders`, body);
  };

  public createFood = (body) => {
    return this.instance.post("admin_panel/foods", body);
  };
}
