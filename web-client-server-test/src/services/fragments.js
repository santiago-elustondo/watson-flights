
export const receiveArrivalCity = ({ params, getState }) => {

  const arrivalCity = params ? params.arrivalCity : undefined

  // should be base level props, not under conversation
  const s = getState().conversation
  const departureCity = s.departureCity

  let statement
  if (arrivalCity && departureCity)
    statement = `cool, so you wanna fly from ${departureCity} to ${arrivalCity}.`
  else if (arrivalCity)
    statement = `ok, so you wanna fly to ${arrivalCity}.`
  else
    statement = `sorry, I didn't get what city you're trying to fly to.`

  return { statement, patch: { arrivalCity } }

}

export const askArrivalCity = ({ getState }) => {

  const s = getState().conversation
  const arrivalCity = s.arrivalCity

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

export const checkArrivalCity = ({ getState, getFragment }) => {

  const s = getState().conversation
  const arrivalCity = s.arrivalCity

  if (!arrivalCity)
    return getFragment('askArrivalCity')()
  else
    return {}

}

export const undoArrivalCity = ({ getState, getFragment }) => {

  const aacFragment = getFragment('askArrivalCity')()

  return {
    statement: `oh, sorry. Maybe I misunderstood.`,
    patch: { arrivalCity: undefined },
    question: aacFragment.question,
    nextNode: aacFragment.nextNode
  }

}

export const receiveDepartureCity = ({ params, getState }) => {

  const departureCity = params ? params.departureCity : undefined

  // should be base level props, not under conversation
  const s = getState().conversation
  const arrivalCity = s.arrivalCity

  let statement
  if (arrivalCity && departureCity)
    statement = `cool, so you wanna fly from ${departureCity} to ${arrivalCity}.`
  else if (arrivalCity)
    statement = `so you're leaving from ${arrivalCity}.`
  else
    statement = `sorry, I didn't get what city you're flying from.`

  return { statement, patch: { departureCity } }

}

export const checkDepartureCity = ({ getState, getFragment }) => {

  const s = getState().conversation
  const departureCity = s.departureCity

  if (!departureCity)
    return getFragment('askDepartureCity')()
  else
    return {}

}

export const askDepartureCity = ({ getState }) => {

  const s = getState().conversation
  const departureCity = s.departureCity

  let question, nextNode;
  if (departureCity) {
    question = `did you say you are leaving from ${departureCity}?`
    nextNode = `ConfirmDepartureCity`
  } else {
    question = `which city are you departing from?`
    nextNode = `ProvideDepartureCity`
  }

  return { question, nextNode }

}

export const undoDepartureCity = ({ getState, getFragment }) => {

  const adcFragment = getFragment('askDepartureCity')()

  return {
    statement: `oh, sorry. Maybe I misunderstood.`,
    patch: { departureCity: undefined },
    question: adcFragment.question,
    nextNode: adcFragment.nextNode
  }

}
