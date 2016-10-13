import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history';
import routes from '../../router/routes.js';
import MainLayout from '../../ui/containers/MainLayout.jsx';
import AdminLayout from '../../admin/AdminLayout.jsx';


toastr.options.preventDuplicates = 'true';

const rootRoute = {
  component: MainLayout,
  childRoutes: routes,
};

const adminRoute = {
  component: AdminLayout;
  childRoutes: routes,
};

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={browserHistory} routes={rootRoute, adminRoute} />,
    document.getElementById('app')
  );
});
