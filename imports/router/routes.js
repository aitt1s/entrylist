import Home from '../ui/pages/Home.jsx';
import About from '../ui/pages/About.jsx';
import CreateEntry from '../ui/pages/CreateEntry.jsx';
import Entry from '../ui/pages/Entry.jsx';
import Register from '../ui/pages/Register.jsx';
import NotFound from '../ui/pages/NotFound.jsx';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }, {
    path: '/register',
    component: Register
  }, {
    path: '/create',
    component: CreateEntry
  }, {
    path: '/e/:id',
    component: Entry
  }, {
    path: '*',
    component: NotFound
  }
];

export default routes;
