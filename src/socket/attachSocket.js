import io from 'socket.io';

import state from '../data/state';

const socket = (app) => {
  const exampleIo = io(app);

  exampleIo.on('connection', (socket) => {
    state.total -= -1;
    state.current -= -1;
    console.log(`a user connected. (total: ${state.total}, current: ${state.current})`)
  
    socket.on('get storage data', () => {
      console.log(`received an event named 'get storage' from the client.`);
      socket.send('get storage data res', state.storage.data);
    })

    socket.on('some event', (someData) => {
      state.storage.data.push(someData);
      console.log(`received an event named 'some event' from the client. data is ${someData}`);
      socket.send('some event res', someData);
    })

    socket.on('broadcate req', (someData) => {
      state.storage.data.push(someData);
      console.log(`received an event named 'broadcast req' from the client. data is ${someData}`);
      exampleIo.emit('broadcast', someData);
    })

    socket.on('disconnect', () => {
      state.current -= 1;
      console.log(`user disconnected. (total: ${state.total}, current: ${state.current})`)
    })
  })

  return exampleIo;
}

export default socket;