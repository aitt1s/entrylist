//imports/startup/client/routes.js
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Entries }  from '../../api/Entries.js';
import { Meteor } from 'meteor/meteor';


// route components
import MainLayout from '../../ui/containers/MainLayout.jsx'
import Home from '../../ui/pages/Home.jsx'

// Admin pages
import AdminLayout from '../../admin/AdminLayout.jsx'
import AdminSidebar from '../../admin/AdminSidebar.jsx'
import AdminEntries from '../../admin/AdminEntries.jsx'
import Users from '../../admin/Users.jsx'
import AdminAreas from '../../admin/AdminAreas.jsx'
import AdminTypes from '../../admin/AdminTypes.jsx'
import SingleItemRender from '../../admin/SingleItemRender.jsx';
import Dashboard from '../../admin/Dashboard.jsx';


// route pages
import Calendar from '../../ui/pages/Calendar.jsx'
import CreateEntry from '../../ui/pages/CreateEntry.jsx'
import Login from '../../ui/pages/Login.jsx'
import Register from '../../ui/pages/Register.jsx'
import Entry from '../../ui/pages/Entry.jsx'
import UserDash from '../../ui/pages/UserDash.jsx'
import ContactList from '../../ui/pages/ContactList.jsx'
import Inbox from '../../ui/pages/Inbox.jsx'


// Not found
import NotFound from '../../ui/pages/NotFound.jsx'

export const isLoggedIn = (nextState, replace) => {
  if (!! Meteor.userId()) {
    replace({
      pathname: '/'
    });
		console.log("logged in!");
  }
	else {
		console.log("not logged in");
	}
}

export const isNotLoggedIn = (nextState, replace) => {
  if (!! Meteor.userId()) {
		console.log("logged in!");
  }
	else {
    replace({
      pathname: '/'
    });
	}
}

export const renderRoutes = () => (

	// const routes =  Render all routes
	<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
		<Route name="Root" path="/" component={ MainLayout }>
			<IndexRoute component={ Home }></IndexRoute>
			<Route path="e" component={ Home } ></Route>
			<Route path="/e/:id" component={Entry} ></Route>
			<Route path="calendar" component={ Calendar } ></Route>
      <Route path="inbox" component={ Inbox } ></Route>
      <Route path="contact" component={ ContactList } ></Route>
			<Route path="create" component={ CreateEntry } onEnter={ isNotLoggedIn }></Route>
      <Route path="dashboard" component={ UserDash } onEnter={ isNotLoggedIn }></Route>
      <Route path="admin" name="Dashboard" component={ AdminLayout }>
        <IndexRoute name="Dashboard" components={{ main: Dashboard, sidebar: AdminSidebar}} ></IndexRoute>
        <Route path="users" name="Users" components={{ main: SingleItemRender, sidebar: AdminSidebar }} >
          <IndexRoute name="Admin" component={ Users } ></IndexRoute>
        </Route>
        <Route path="areas" name="areas" components={{ main: SingleItemRender, sidebar: AdminSidebar }} >
          <IndexRoute name="Admin" component={ AdminAreas } ></IndexRoute>
        </Route>
        <Route path="types" name="types" components={{ main: SingleItemRender, sidebar: AdminSidebar }} >
          <IndexRoute name="Admin" component={ AdminTypes } ></IndexRoute>
        </Route>
        <Route path="entries" name="Entries" components={{ main: SingleItemRender, sidebar: AdminSidebar }}>
          <IndexRoute name="Admin" component={ AdminEntries } ></IndexRoute>
          <Route path=":id" name="SingleEntry" component={ Entry }></Route>
        </Route>
      </Route>
			<Route path="login" component={ Login } onEnter={ isLoggedIn }></Route>
			<Route path="register" component={ Register} onEnter={ isLoggedIn }></Route>>
		</Route>
		<Route path="*" component={ NotFound }></Route>
	</Router>
);

// export default renderRoutes
