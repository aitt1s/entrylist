//import '../imports/startup/client/main.js';

//client/main.js

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js'

var AdminLTEOptions = {
	//Enable sidebar expand on hover effect for sidebar mini
	//This option is forced to true if both the fixed layout and sidebar mini
	//are used together
	sidebarExpandOnHover: true,
	//BoxRefresh Plugin
	enableBoxRefresh: true,
	//Bootstrap.js tooltip
	enableBSToppltip: true
};

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('app'));
});
