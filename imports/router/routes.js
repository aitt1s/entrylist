import Home from '../ui/pages/Home.jsx';
import About from '../ui/pages/About.jsx';
import CreateEntry from '../ui/pages/CreateEntry.jsx';
import Entry from '../ui/pages/Entry.jsx';
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
    path: '/create',
    component: CreateEntry
  }, {
    path: '/e/:name',
    component: Entry
  }, {
    path: '*',
    component: NotFound
  }
];

export default routes;
