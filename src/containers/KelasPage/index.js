import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import KelasListScreen from './KelasListScreen';
import KelasDetailScreen from './KelasDetailScreen';
import KelasFollowScreen from './KelasFollowScreen';
import KelasDoneScreen from './KelasDoneScreen';
import KelasOtwScreen from './KelasOtwScreen';
import KelasManajemenScreen from './Pengajar/KelasManajemenScreen';
import KelasInsertScreen from './Pengajar/KelasInsertScreen';

export default function PromotionBannerPage() {
  const { path } = useRouteMatch();
  return (
    <div className="pt-3">
      <Switch>
        <Route
          path={`${path}/semua-kelas`}
          exact
          name="kelas-list"
          component={KelasListScreen}
        />


        <Route
          path={`${path}/list`}
          exact
          name="kelas-list"
          component={KelasManajemenScreen}
        />
        <Route
          path={`${path}/insert`}
          exact
          name="kelas-list"
          component={KelasInsertScreen}
        />


        <Route
          path={`${path}/detail/:id`}
          exact
          name="kelas-keluar.detail"
          component={KelasDetailScreen}
        />
        <Route
          path={`${path}/follow`}
          exact
          name="kelas-keluar.detail"
          component={KelasFollowScreen}
        />
        <Route
          path={`${path}/done`}
          exact
          name="kelas-keluar.done"
          component={KelasDoneScreen}
        />
        <Route
          path={`${path}/otw/:id`}
          exact
          name="kelas-keluar.otw"
          component={KelasOtwScreen}
        />


      </Switch>
    </div>
  );
}
