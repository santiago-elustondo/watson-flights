import * as A from '../actions/misc-actions'

export default function * ProvideDepartureCity ({ msg, getState, dispatch, getFragment }) {

  const grabFirstEntity = (entity) => (
      msg.entities.find(e => e.entity == entity) || {}
    ).value

  const departureCity = grabFirstEntity('City')
  const arrivalCity = getState().arrivalCity

  const rdcFragment = getFragment('receiveDepartureCity')({ departureCity })

  if (departureCity) {

    yield dispatch(A.updateState(rdcFragment.patch))
    yield dispatch(A.say(rdcFragment.statement))

    const backtrack = [ 'undoDepartureCity' ]

    const cacFragment = getFragment('checkArrivalCity')()

    if (cacFragment.question) {
      yield dispatch(A.say(cacFragment.question))
      return { backtrack, nextNode: cacFragment.nextNode }
    } else {
      yield dispatch(A.say(`k, i guess we're done`))
      return { backtrack, nextNode: 'stop' }
    }

  } else {

    const adcFragment = getFragment('askDepartureCity')()

    yield dispatch(A.say(rdcFragment.statement))
    yield dispatch(A.say(adcFragment.question))
    return { nextNode: adcFragment.nextNode }

  }

}
