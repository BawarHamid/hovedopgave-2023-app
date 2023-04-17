import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Tailwind & Ant-d CSS imports */
import "./theme/tailwind-setup.css";

/* Theme variables */
import "./theme/ionic-variables.css";
import "./theme/variables.css";
import "./theme/global.css";

/** Screens imports */
import LandingScreen from "./screens/authentication/LandingScreen";
import LoginScreen from "./screens/authentication/LoginScreen";

setupIonicReact();

const App = () => {
  return (
    <IonApp className="bg-white">
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            {<Redirect to="/welcome" />}
          </Route>
          {/* Home, auth, profile-setup*/}
          <Route exact path="/welcome" component={LandingScreen} />
          <Route exact path="/login" component={LoginScreen} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
