import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ArtikelInsertScreen from './ArtikelInsertScreen';
import ArtikelEditScreen from './ArtikelEditScreen';
import ArtikeManajemenScreen from './ArtikelManajemenScreen';

export default function PromotionBannerPage() {
  const { path } = useRouteMatch();
  return (
    <div className="pt-3">
      <Switch>
        <Route
          path={`${path}`}
          exact
          name="kelas-list"
          component={ArtikeManajemenScreen}
        />


        <Route
          path={`${path}/insert`}
          exact
          name="kelas-list"
          component={ArtikelInsertScreen}
        />
        <Route
          path={`${path}/edit/:id`}
          exact
          name="kelas-list"
          component={ArtikelEditScreen}
        />


      </Switch>
    </div>
  );
}
