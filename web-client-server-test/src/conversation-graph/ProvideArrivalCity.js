import * as A from '../actions/misc-actions'
import * as F from '../services/FlightsService'

const receiveArrivalCity = ({
  data: { arrivalCity, departureCity = undefined }
}) => {

  let txt
  if (arrivalCity && departureCity)
    txt = `cool, so you wanna fly from ${departureCity} to ${arrivalCity}.`
  else if (arrivalCity)
    txt = `ok, so you wanna fly to ${arrivalCity}.`
  else
    txt = `sorry, I didn't get what city you're trying to fly to.`

  return { txt, patch: { arrivalCity } }

}

const askArrivalCity = ({
  data: { arrivalCity },
}) => {

  let question, nextNode;
  if (arrivalCity) {
    question = `did you say you wanted to fly to ${arrivalCity}?`
    nextNode = `ConfirmArrivalCity`
  } else {
    question = `which city are you looking to fly to?`
    nextNode = `ProvideArrivalCity`
  }

  return { question, nextNode }

}

const undoArrivalCity = ({} = {}) => {

  const aacFragment = askArrivalCity({ data: {} })

  return {
    statement: `oh, sorry. Maybe I misunderstood.`,
    patch: { arrivalCity: undefined },
    question: aacFragment.question,
    nextNode: aacFragment.nextNode
  }

}

const askDepartureCity = ({
  data: { departureCity }
}) => {

  let txt;
  if (departureCity)
    txt = `did you say you are leaving from ${departureCity}?`
  else
    txt = `which city are you departing from?`

  return { txt }

}

export function * ProvideArrivalCity ({ msg, getState, dispatch }) {

  const grabFirstEntity = (entity) => (
      msg.entities.find(e => e.entity == entity) || {}
    ).value

  const arrivalCity = grabFirstEntity('City')
  const departureCity = getState().departureCity

  const racFragment = receiveArrivalCity({
    data: { arrivalCity, departureCity }
  })

  if (arrivalCity) {

    yield dispatch(A.updateState(racFragment.patch))
    yield dispatch(A.say(racFragment.txt))

    if (!departureCity /* || departureCityCertainty < 7 */ ) {

      const adcFragment = askDepartureCity({ data: {} })

      yield dispatch(A.say(adcFragment.txt))
      yield dispatch(A.say(`[SRY WE DONT HAVE THE NODES]`))

    } else {

      yield dispatch(A.say(`i guess we're done!`))

    }

    const backtrack = {
      patch: { arrivalCity: undefined },
      fragment: undoArrivalCity, // should be serializable. should have a getFragment()`, which feed in getState() so we dont need "data"
    }

    return { nextNode: 'stop', backtrack }

  }

  else {

    const aacFragment = askArrivalCity({ data: {} })

    yield dispatch(A.say(racFragment.txt))
    yield dispatch(A.say(aacFragment.txt))
    return { nextNode: 'ProvideArrivalCity' }

  }

}
