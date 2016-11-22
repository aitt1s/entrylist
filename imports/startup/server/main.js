console.log("Starting server...");

import '../../api/api.js';

var basicAuth = new HttpBasicAuth("test", "test");
basicAuth.protect();
