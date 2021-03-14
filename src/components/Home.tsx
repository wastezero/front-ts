import { Api } from "@src/api/Kis";
import { useStoreActions, useStoreState } from "@src/hooks";
import { getCookie, removeKisToken, setKisToken } from "@src/utils/utils";
import * as React from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import LoadingContainer from "./atoms/LoadingContainer";
import Sidebar from "./organisms/SIdebar";
import MenuSvg from "@heroicons/outline/menu-alt-1.svg";
import BellSvg from "@heroicons/outline/bell.svg";
import UserSolidSvg from "@heroicons/solid/user.svg";
import ChevronDownSvg from "@heroicons/solid/chevron-down.svg";
import cn from "classnames";
import { BranchList } from "./pages/Branches/List";
import RestaurantList from "./pages/Restaurants/List";
import { ManagerList } from "./pages/Managers/List";

const ProfileDropdown: React.FC = () => {
  const history = useHistory();
  const user = useStoreState((store) => store.user.state);
  const setUser = useStoreActions((store) => store.user.setUser);
  let [isDropdownShown, setIsDropdownShown] = React.useState(false);

  const onLogout = () => {
    removeKisToken();
    history.push("/login");
    setUser(null);
  };

  return (
    <div className="ml-3 relative">
      <div>
        <button
          className="max-w-xs flex items-center text-sm text-gray-400 rounded-full focus:outline-none focus:bg-gray-100 lg:p-2 lg:rounded-md lg:hover:bg-gray-100"
          id="user-menu"
          onClick={(_) => {
            setIsDropdownShown(!isDropdownShown);
          }}
        >
          <span className="inline-flex items-center justify-center h-8 w-8 p-1 rounded-full bg-gray-500">
            <UserSolidSvg className="text-white h-7 w-7" />
          </span>
          <p className="hidden ml-3 text-gray-700 text-sm leading-5 font-medium lg:block">
            {user.name}
          </p>
          <ChevronDownSvg className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block" />
        </button>
      </div>
      <div
        className={cn(
          "origin-top-right",
          "absolute",
          "right-0",
          "mt-2",
          "w-48",
          "rounded-md",
          "shadow-lg",
          { hidden: !isDropdownShown },
        )}
      >
        <div
          className="py-1 rounded-md bg-white shadow-xs flex flex-col items-stretch"
          role="menu"
        >
          <div
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
            role="menuitem"
          >
            Your Profile
          </div>
          <div
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
            role="menuitem"
          >
            Settings
          </div>
          <button
            onClick={(_) => {
              onLogout();
            }}
            className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
      <button className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden">
        <MenuSvg className="h-6 w-6 transition ease-in-out duration-150" />
      </button>
      <div className="flex-1 px-4 flex justify-between sm:px-6  lg:px-8">
        <div className="flex-1 flex" />
        <div className="ml-4 flex items-center md:ml-6">
          <button className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500">
            <BellSvg className="h-6 w-6" />
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const api = new Api();
  const history = useHistory();
  let { path, url } = useRouteMatch();

  const [loading, setLoading] = React.useState(false);
  const setCurrentUser = useStoreActions((store) => store.user.setUser);
  const currentUser = useStoreState((state) => state.user.state);

  React.useEffect(() => {
    console.log("window.location.pathname", window.location.pathname);
    if (window.location.pathname != "/login" && !currentUser) {
      const token = getCookie("kis_token");
      if (!token) {
        history.push(`login?return_to=${window.location.pathname}`);
      } else {
        setLoading(true);
        api
          .whoAmI()
          .then((user) => {
            setKisToken(user.data.authentication_token);
            setCurrentUser(user.data);
            history.push("account");
          })
          .finally(() => setLoading(false));
      }
    }
  }, []);
  return (
    <LoadingContainer loading={!currentUser || loading}>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-auto focus:outline-none">
          <Navbar />
          <Switch>
            <Route exact path={path}>
              <h3>Home Page</h3>
            </Route>
            <Route path={`${path}/branches`}>
              <BranchList />
            </Route>
            <Route path={`${path}/restaurants`}>
              <RestaurantList />
            </Route>
            <Route path={`${path}/managers`}>
              <ManagerList />
            </Route>
          </Switch>
        </div>
      </div>
    </LoadingContainer>
  );
};

export default Home;
