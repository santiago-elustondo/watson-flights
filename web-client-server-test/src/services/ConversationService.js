import SocketIO from 'socket.io-client';
import { receiveMsg } from '../actions/conversationActions';
import { updateArrivalCity } from '../actions/flightsActions'
import * as ConversationActionsTypes from '../actions/conversationActionTypes'

import * as CG from './conversation-nodes';

let state = {
  nextNode: null,
  history: []
}

function _o(object, ...extensions){
  return Object.assign({}, object, ...extensions)
}

function provideArrivalCity(m, s) {

}

function baseline(m, s) {
  //.direct
  if(m.intents.find(i => i.intent == 'info-location-arrival')) {
      return provideArrivalCity(m, s)
  }
}

class ConversationService {

  constructor(store){

    this.store = store;
    this.socket = SocketIO('http://localhost:8080');
    this.socket.on('connect', () => { console.log('socket connected') });
    this.socket.on('disconnect', () => { console.log('socket disconnected') });
    this.socket.on('msg', msg => {
      console.log(msg, state);

    //  const state = store.getState()

      const result = CG.respond(msg.response, state);

      // this should be an action (should be immutablejs, which is nicer to merge and stuff)
      state = _o(state, result.stateUpdate);

/*
      if(result.action) store.dispatch(result.action)
      if(result.next) store.dispatch({
        type: 'SET_CONVERSATION_HANDLER',
        nextNode: result.nextNode
      })
*/
      if(result.text) store.dispatch({
        type: 'ADD_MSG',
        msg: {
          text: result.text,
          username: 'bot'
        }
      })

    });
  }

  sendMsg(msg){
    return this.socket.emit('msg', msg)
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
