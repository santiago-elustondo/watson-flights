
import { conversationGraph } from './conversation-graph'

import { Start } from '../conversation-graph/Start'
import { ProvideArrivalCity } from '../conversation-graph/ProvideArrivalCity'

import { graph } from './conversation-graph'
import * as F from './FlightsService'

import * as A from '../actions/misc-actions'

// node (import)
export function * stop ({ msg, getState, dispatch }) {

  // this should be a parent class method with hook
  if (msg.intents.find(i => i.intent == 'backtrack')) {
    const lastFrame = getState()._conv_.history.slice(-1)[0]
    const bt = lastFrame.backtrack
    const btFragment = bt.fragment()
    yield dispatch(A.updateState(btFragment.patch))
    yield dispatch(A.say(btFragment.statement))
    yield dispatch(A.say(btFragment.question))
    return { nextNode: btFragment.nextNode }
  }

  yield dispatch(A.updateFlightsList())

  console.log('2')

  yield dispatch(A.say(`we're done. talk to the hand.`))

  return {
    nextNode: 'stop'
  }
}

export const createWFConversationGraph = conversationGraph({
//  start: 'stop',
  nodes: [
    stop,
    Start,
    ProvideArrivalCity
  ]
});
