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

/* Home, auth, profile-setup */
import LandingScreen from "./screens/authentication/LandingScreen";
import LoginScreen from "./screens/authentication/LoginScreen";
import RegisterScreen from "./screens/authentication/RegisterScreen";
import ProfileSetupScreen from "./screens/profile-setup/ProfileSetupScreen";
import SetupProfilePictureScreen from "./screens/profile-setup/ProfilePictureSetupScreen";
import ForgotPasswordScreen from "./screens/authentication/ForgotPasswordScreen";
import CheckMailScreen from "./screens/authentication/CheckMailScreen";

// Test pages
import TestFeedScreen from "./screens/feeds/TestFeedScreen";

/* CRUD for recipes */
import SetDishPictureScreen from "./screens/create-food-recipe/SetDishPictureScreen";
import SetDishDescriptionScreen from "./screens/create-food-recipe/SetDishDescriptionScreen";
import SetDishTitleScreen from "./screens/create-food-recipe/SetDishTitleScreen";
import SetDishRecipeScreen from "./screens/create-food-recipe/SetDishRecipeScreen";
import SelectUploadTypeScreen from "./screens/upload/SelectUploadTypeScreen";

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
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgot-password"
            component={ForgotPasswordScreen}
          />
          <Route exact path="/check-mail" component={CheckMailScreen} />
          <Route exact path="/profile-setup" component={ProfileSetupScreen} />
          <Route
            exact
            path="/profile-picture"
            component={SetupProfilePictureScreen}
          />
          <Route exact path="/select-type" component={SelectUploadTypeScreen} />

          {/* create dish flow */}
          <Route exact path="/set-title" component={SetDishTitleScreen} />
          <Route
            exact
            path="/set-description"
            component={SetDishDescriptionScreen}
          />
          <Route exact path="/set-recipe" component={SetDishRecipeScreen} />
          <Route exact path="/set-picture" component={SetDishPictureScreen} />

          {/* testing */}
          <Route exact path="/test-feed" component={TestFeedScreen} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
