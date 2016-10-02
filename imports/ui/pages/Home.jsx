import React from 'react';
import classNames from 'classnames';
import Jumbotron from '../components/Jumbotron.jsx';
import List from '../components/List.jsx';

function Home() {
  return (
    <div className={classNames('Home', 'foo', 'bar')} >
      <Jumbotron />
      <List />
    </div>
  );
}

export default Home;
