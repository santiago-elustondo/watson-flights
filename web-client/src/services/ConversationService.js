import SocketIO from 'socket.io-client';
import { receiveMsg } from '../actions/conversationActions';

class ConversationService {

  constructor(store){
    this.store = store;
    this.socket = SocketIO('http://localhost:8080');
    this.socket.on('connect', () => { console.log('socket connected') });
    this.socket.on('disconnect', () => { console.log('socket disconnected') });
    this.socket.on('msg', msg => store.dispatch(receiveMsg(msg)) );
  }

  sendMsg(text){
    return this.socket.emit('msg', { text })
  }

}

// singleton instance
let instance

export function createConversationService(store){
  instance = new ConversationService(store)
}

export function getConversationService(){
  return instance
}
