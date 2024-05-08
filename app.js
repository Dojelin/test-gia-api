import  express from 'express';
var app = express();

import routes from './controllers/usersController.js';

app.use(express.json());
routes(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});