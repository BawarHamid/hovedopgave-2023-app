import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent } from '@ionic/react';
import { planetOutline, planet, searchOutline, search, filmOutline, film, personOutline, person } from 'ionicons/icons';
import { useEffect } from 'react';
import { Route, useLocation } from 'react-router';
import { useTabs } from 'store/tabs';
import { useAuthUserStore } from 'store/user';
import ExploreScreen from 'ui/screens/feeds/ExploreScreen';
import ReelScreen from 'ui/screens/feeds/ReelScreen';
import YourFeedScreen from 'ui/screens/feeds/YourFeedScreen';
import ProfileScreen from 'ui/screens/profiles/ProfileScreen';
import { discover, profile, reels, yourFeed } from 'utils/constants/routes';
import styles from './Tabs.module.css';

const Tabs: React.FC = () => {
  const { selectedTab, setSelectedTab } = useTabs();
  const { authUser } = useAuthUserStore((state) => ({ authUser: state.authUser }));
  const location = useLocation();

  const changeTab = (e: CustomEvent) => {
    const tab = e.detail.tab;
    setSelectedTab(tab);
  };

  //On refresh the tab is not selected so we need to redirect to the correct tab
  useEffect(() => {
    // first split path by /
    const tabname = location.pathname.split('/')[2];
    // then check if the tabname is selected tab in global state
    if (tabname !== selectedTab) {
      // if it's not set the selected tab to the correct tab
      setSelectedTab(tabname);
    }
  }, []);

  const pages = [
    {
      tabNumber: 'your-feed',
      name: 'Feed',
      icon: planetOutline,
      selected: planet,
      path: `/tabs${yourFeed}`,
      component: YourFeedScreen,
    },
    {
      tabNumber: 'discover',
      name: 'Discover',
      icon: searchOutline,
      selected: search,
      path: `/tabs${discover}`,
      component: ExploreScreen,
    },
    {
      tabNumber: 'reels',
      name: 'Reels',
      icon: filmOutline,
      selected: film,
      path: `/tabs${reels}`,
      component: ReelScreen,
    },
    {
      tabNumber: 'profile',
      name: 'Profile',
      icon: personOutline,
      selected: person,
      path: `/tabs${profile}`,
      component: ProfileScreen,
    },
  ];

  return (
    <IonContent>
      <IonTabs onIonTabsDidChange={changeTab}>
        <IonRouterOutlet>
          {pages.map((p, i) => (
            <Route key={i} exact path={p.path} component={p.component} />
          ))}
        </IonRouterOutlet>
        <IonTabBar
          slot="bottom"
          color={selectedTab !== 'reels' ? 'white-background' : ''}
          className={`${selectedTab === 'reels' && styles.reelsStyling} h-[70px] border-t-[1px] border font-semibold`}
        >
          {pages.map((p, i) => {
            let finalPath = p.path;
            const pathSplit = p.path.split(':');
            if (pathSplit.length > 1) finalPath = `${pathSplit[0]}${authUser?.id}`;
            return (
              <IonTabButton key={i} tab={p.tabNumber} href={finalPath}>
                {selectedTab && <IonIcon color={selectedTab === 'reels' ? 'white-background' : ''} icon={selectedTab === p.tabNumber ? p.selected : p.icon} /> }
                <IonLabel color={selectedTab === 'reels' ? 'white-background' : ''}>{selectedTab === p.tabNumber ? p.name : ''}</IonLabel>
              </IonTabButton>
            );
          })}
        </IonTabBar>
      </IonTabs>
    </IonContent>
  );
};
export default Tabs;
