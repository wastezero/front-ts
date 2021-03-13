import { IUser } from "@src/interfaces/IUser";
import { Action } from "easy-peasy";

export interface IUserStore {
  state?: IUser;
  setUser: Action<IUserStore, IUser | null>;
}
