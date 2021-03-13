import { Api } from "@src/api/Kis";
import { useStoreActions, useStoreState } from "@src/hooks";
import { getCookie, setKisToken } from "@src/utils/utils";
import * as React from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import LoadingContainer from "./atoms/LoadingContainer";
import Sidebar from "./organisms/SIdebar";

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
    <LoadingContainer loading={loading}>
      <div className="h-screen flex overflow-hidden bg-cool-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-auto focus:outline-none">
          <Switch>
            <Route exact path={path}>
              <h3>Please select a topic.</h3>
            </Route>
            <Route path={`${path}/:topicId`}>"other routes"</Route>
          </Switch>
        </div>
      </div>
    </LoadingContainer>
  );
};

export default Home;
