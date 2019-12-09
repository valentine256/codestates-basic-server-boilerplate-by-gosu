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
      socket.emit('get storage data res', storage.data);
    })

    socket.on('some event', (someData) => {
      storage.data.push(someData);
      console.log(`received an event named 'some event' from the client. data is ${JSON.stringify(someData)}`);
      socket.emit('some event res', someData);
    })

    socket.on('broadcast req', (someData) => {
      if(someData.name.length === 0) {
        console.log('이름 없음')
        socket.emit('err', ('name 적어서 보내세요'))
        return;
      }
      if(someData.message.length === 0) {
        console.log('빈 메시지')
        socket.emit('err', ('내용 적어서 보내세요'))
        return;
      }
      storage.data.push(someData);
      console.log(`received an event named 'broadcast req' from the client. data is ${JSON.stringify(someData)}`);
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