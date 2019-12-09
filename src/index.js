import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import attachSocket from './socket/attachSocket';
import basicRouter from './route/basicRouter';

const port = 8080;
const ip = '127.0.0.1';

const app = express();
app.use(cors());
app.use(bodyParser());
app.use('someurl/', basicRouter);

const server = http.createServer(app);

attachSocket(server);

server.listen(port, ip, () => {
  console.log('listening on http://' + ip + ':' + port);
});
