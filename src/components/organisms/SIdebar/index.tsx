import * as React from "react";
import { NavLink } from "react-router-dom";
import HomeSvg from "@heroicons/outline/home.svg";
import LibrarySvg from "@heroicons/outline/library.svg";
import OfficeBuilding from "@heroicons/outline/office-building.svg";
import UserSvg from "@heroicons/outline/user.svg";
import ChatSvg from "@heroicons/outline/chat-alt-2.svg";
import MenuSvg from "@heroicons/outline/menu.svg";
import ShoppingBagSvg from "@heroicons/outline/shopping-bag.svg";
import { useStoreState } from "@src/hooks";

interface ISidebarProps {}

/*
  | "admin" => Route.AdminCtx
  | "restaurant" => Route.RestaurantCtx
  | "manager" => Route.ManagerCtx
  | "client"
  | _ => Route.ClientCtx
*/
const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const user = useStoreState((store) => store.user.state);

  const menuItems = [
    {
      label: "Home",
      to: "/account",
      icon: (
        <HomeSvg className="h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 mr-4" />
      ),
      visible: true,
    },
    {
      label: "Restaurants",
      to: "/account/restaurants",
      icon: (
        <LibrarySvg className="h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 mr-4" />
      ),
      visible: user.role === "admin",
    },
    {
      label: "Branches",
      to: "/account/branches",
      icon: (
        <OfficeBuilding className="h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 mr-4" />
      ),
      visible: user.role === "admin" || user.role === "restaurant",
    },
    {
      label: "Managers",
      to: "/account/managers",
      icon: (
        <UserSvg className="h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 mr-4" />
      ),
      visible: user.role !== "manager" && user.role !== "client",
    },
    {
      label: "Foods",
      to: "/account/foods",
      icon: (
        <MenuSvg className="h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 mr-4" />
      ),
      visible: user.role !== "client",
    },
    {
      label: "Orders",
      to: "/account/orders",
      icon: (
        <ShoppingBagSvg className="h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 mr-4" />
      ),
      visible: user.role !== "client",
    },
    {
      label: "Chats",
      to: "/account/chats",
      icon: (
        <ChatSvg className="h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 mr-4" />
      ),
      visible: true,
    },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
              <a className="h-8 w-auto font-medium text-white text-xl" href="#">
                WasteZero
              </a>
            </div>
            <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
              <div className="overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {menuItems
                    .filter((item) => item.visible)
                    .map((item, index) => {
                      return (
                        <NavLink
                          exact
                          to={item.to}
                          key={`item-${index}`}
                          className="group flex items-center px-2 py-2 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white"
                          activeClassName="text-white bg-gray-700"
                        >
                          {item.icon}
                          {item.label}
                        </NavLink>
                      );
                    })}
                </nav>
              </div>
              <hr className="h-px mt-6 bg-gray-700 border-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
