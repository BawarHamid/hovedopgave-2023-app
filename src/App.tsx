import { IonApp, IonLoading, IonRouterOutlet, setupIonicReact } from "@ionic/react";
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
import ProfileScreen from "./screens/authentication/ProfileScreen";

// Test pages
import TestFeedScreen from "./screens/feeds/TestFeedScreen";
import { useAuthUserStore } from "./store/user";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "./apis/supabase/supabaseClient";


setupIonicReact();

const App = () => {
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
          {/* testing */}
          <Route exact path="/test-feed" component={TestFeedScreen} />
          <Route exact path="/profile/:id" component={ProfileScreen} />
          <Route exact path="/">
              <Redirect to={session ? '/home' : '/welcome'} />
            </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
