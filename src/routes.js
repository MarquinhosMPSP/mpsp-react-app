import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import List from "./pages/List";
import Report from "./pages/Report";
import Options from "./pages/Options";

const routes = createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Report,
    Options
  })
);

export default routes;
