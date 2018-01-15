import * as A from '../actions/misc-actions'

export default function * Start ({ msg, getNode, getFragment, getState, dispatch, getArgs }) {

  // utils
  const grabFirstEntity = (entity) => (
      msg.entities.find(e => e.entity == entity) || {}
    ).value

  const s = getState().conversation

  if (!msg.input.text && !s.saidHi) { // init message is blank

    yield dispatch(A.say('hello! can i help you?'))
    yield dispatch(A.updateState({ saidHi: true }))

    return { nextNode: 'Start' }

  }

  if (msg.intents.find(i => i.intent == 'info-location-arrival')) {
    const date = grabFirstEntity('sys-date')
    if (date) {
      const sdFragment = getFragment('setDate')({ date })
      yield dispatch(A.updateState(sdFragment.patch))
      yield dispatch(A.say(sdFragment.statement))
      const pacNodeRet = yield getNode('ProvideArrivalCity')(getArgs())
      const backtrack = ( pacNodeRet.backtrack || [] ).concat(sdFragment.backtrack)
      return { ...pacNodeRet, backtrack }
    } else {
      return getNode('ProvideArrivalCity')(getArgs())
    }

  }

  if (msg.intents.find(i => i.intent == 'info-location-both')) {}
    // return getNode('ProvideArrivalCity')(m, s, n)

  if (msg.intents.find(i => i.intent == 'info-location-departure')) {
    // return getNode('ProvideDepartureCity')(m, s, n)
  }

  yield dispatch(A.say(`umm, sorry what?`))

  return { nextNode: 'Start' }

}
