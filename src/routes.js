import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import List from "./pages/List";
import Report from "./pages/Report";

const routes = createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Report
  })
);

export default routes;
