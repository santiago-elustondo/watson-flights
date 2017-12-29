import * as types from '../actions/conversationActionTypes'

const initialState = {
  messageHistory: [],
  context: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case types.ADD_MSG:
      return _o(state, {
        messageHistory: state.messageHistory.concat(action.msg)
      })
    case types.UPDATE_SYSTEM:
      return _o(state, {
        context: _o(state.context, {
          system: action.systemState,
          conversation_id: action.conversationId
        })
      })
    case types.SET_ARRIVAL_CITY:
      return _o(state, {
        context: _o(state.context, {
          arrival_city: action.params.city
        })
      })
    case types.SET_DEPARTURE_CITY:
      return _o(state, {
        context: _o(state.context, {
          departure_city: action.params.city
        })
      })
    default:
      return state;
  }
}

// helpers -----

function _o(object, ...extensions){
  return Object.assign({}, object, ...extensions)
}
