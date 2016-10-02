import React from 'react';
import { Entries } from '../../api/Entries.js';

const addressName = params.name;
const currentEntry = Entries.find({name: addressName);
console.log(currentEntry);

export const Entry = ( { params } ) => (
  <h3>Howdy, { params.name }!</h3>
);

export default Entry;
