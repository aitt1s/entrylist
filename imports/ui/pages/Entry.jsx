import React from 'react';

import { Entries } from '../../api/Entries.js';

export const Entry = ( { params } ) => (
  <h3>Howdy, { params.name }!</h3>
);

export default Entry;
