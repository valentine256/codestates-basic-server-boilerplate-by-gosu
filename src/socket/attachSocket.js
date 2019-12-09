import io from 'socket.io';

import storage from '../data/storage';

const socket = (app) => {
  const exampleIo = io(app);

  exampleIo.on('connection', (socket) => {
    storage.total -= -1;
    storage.current -= -1;
    console.log(`a user connected. (total: ${storage.total}, current: ${storage.current})`)
  
    socket.on('get storage data', () => {
      console.log(`received an event named 'get storage' from the client.`);
      socket.send('get storage data res', storage.storage.data);
    })

    socket.on('some event', (someData) => {
      storage.storage.data.push(someData);
      console.log(`received an event named 'some event' from the client. data is ${someData}`);
      socket.send('some event res', someData);
    })

    socket.on('broadcate req', (someData) => {
      storage.storage.data.push(someData);
      console.log(`received an event named 'broadcast req' from the client. data is ${someData}`);
      exampleIo.emit('broadcast', someData);
    })

    socket.on('disconnect', () => {
      storage.current -= 1;
      console.log(`user disconnected. (total: ${storage.total}, current: ${storage.current})`)
    })
  })

  return exampleIo;
}

export default socket;