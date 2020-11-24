import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


import ProfilePage from './Profile'
import ChangePasswordScreen from './ChangePasswordScreen'

export default function PromotionBannerPage() {
  const { path } = useRouteMatch();
  return (
    <div className="pt-3">
      <Switch>
        <Route
          path={`${path}`}
          exact
          name="profile-page"
          component={ProfilePage}
        />
        <Route
          path={`${path}/change-password`}
          exact
          name="promotion-banner"
          component={ChangePasswordScreen}
        />

      </Switch>
    </div>
  );
}
