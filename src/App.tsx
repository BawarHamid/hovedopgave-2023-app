import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { useAuthUserStore } from "./store/user";
import { supabase } from "./apis/supabase/supabaseClient";

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
import ProfileScreen from "./screens/profile/ProfileScreen";
import YourFeedScreen from "./screens/feeds/YourFeedScreen";

// Test pages
import TestFeedScreen from "./screens/feeds/TestFeedScreen";

/* CRUD for recipes */
import SetDishPictureScreen from "./screens/create-food-recipe/SetDishPictureScreen";
import SetDishDescriptionScreen from "./screens/create-food-recipe/SetDishDescriptionScreen";
import SetDishInfoScreen from "./screens/create-food-recipe/SetDishInfoScreen";
import SetDishRecipeScreen from "./screens/create-food-recipe/SetDishRecipeScreen";
import SelectUploadTypeScreen from "./screens/upload/SelectUploadTypeScreen";
// import ViewDishModal from "./components/modals/switch-between-modal/ViewDishModal";

setupIonicReact({ mode: "ios" });
// setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const setAuthUser = useAuthUserStore((state) => state.setAuthUser);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => updateSession());
    void updateSession();
    return () => data.subscription.unsubscribe();
  }, []);

  const updateSession = async (): Promise<void> => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    data.session && setAuthUser(data.session.user);
    setLoading(false);
  };
  const userId = useAuthUserStore((state) => state.authUser?.id);

  return (
    <IonApp className="bg-white">
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Redirects */}

          {/* <Route exact path="/"> - not working, den korrekte
            <Redirect to={session ? "/your-feed" : "/welcome"} />
          </Route> */}

          <Route exact path="/">
            {/* <Redirect to={session ? "/your-feed" : /profile/${userId}`} /> */}
            <Redirect to={session ? "/your-feed" : "/your-feed"} />
          </Route>

          {/* Auth, profile-setup*/}
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

          {/* yourfeed, profile*/}
          <Route exact path="/your-feed" component={YourFeedScreen} />
          {/* <Route exact path={`/profile/${userId}`} component={ProfileScreen} /> */}
          <Route exact path="/profile/:id" component={ProfileScreen} />

          {/* create dish flow */}
          <Route exact path="/set-info" component={SetDishInfoScreen} />
          <Route
            exact
            path="/set-description"
            component={SetDishDescriptionScreen}
          />
          <Route exact path="/set-recipe" component={SetDishRecipeScreen} />
          <Route exact path="/set-picture" component={SetDishPictureScreen} />

          {/* testing */}
          <Route exact path="/test-feed" component={TestFeedScreen} />
          {/* <Route exact path="/test1" component={ViewDishModal} /> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
