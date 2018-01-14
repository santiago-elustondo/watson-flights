function _o(object, ...extensions){
  return Object.assign({}, object, ...extensions.filter(e => !!e))
}

export function ProvideArrivalCity (m, s, n, f) {

  const haveFlag = (flag) => f ? f.find(f => f == flag) : false
  const grabFirstEntity = (entity) => ( m.entities.find(e => e.entity == entity) || {} ).value

  const city = haveFlag('USE_EXISTING') ? s.arrivalCity : grabFirstEntity('City')
  const province = grabFirstEntity('Province')
  const date = grabFirstEntity('sys-date')
  const time = grabFirstEntity('sys-time')

  // do state update
  let stateUpdate = {};
  if (city) stateUpdate.arrivalCity = city;
  if (city && date) stateUpdate.date = date;

  // do nextNode
  let nextNode = 'Start';
  if (!s.departureCity) nextNode = 'ProvideDepartureCity';
  else nextNode = 'stop';

  // do backtrack
  let backtrack = { node: 'ChangeArrivalCity', flags: [ 'MISUNDERSTOOD' ] }
  if (date) backtrack.updateState = state => { delete state.date; return state }

  // do text
  let text;

  let locationsPart;
  if (city && s.departureCity)
    locationsPart = `so you wanna fly from ${s.departureCity} to ${city}`
  else if (city)
    locationsPart = `so you wanna fly to ${city}`
  else
    locationsPart = `sorry, I didn't get what city you're trying to fly to`

  let datePart;
  if (city && date)
    datePart = `on ${date}`

  let questionPart;
  if (!s.departureCity)
    questionPart = `where are you departing from?`

  text = `${locationsPart}`

  if (datePart)
    text = `${text}, ${datePart}.`
  else
    text = `${text}.`

  if (questionPart)
    text = `${text} ${questionPart}`

  return {
    stateUpdate,
    nextNode,
    backtrack,
    text
  }

  /*
  if (city) {

    const updateArrivalCity = { arrivalCity: city }

    if (date) {

      const updateDate = { date }

      if (!s.departureCity)
        return {
          text: `so you wanna fly to ${city} on ${date}, where are you departing from?`,
          stateUpdate: _o(updateArrivalCity, updateDate),
          nextNode: 'ProvideDepartureCity',
          backtrack: {
            node: 'ChangeArrivalCity',
            flags: [ 'MISUNDERSTOOD', 'CLEAR_DATE'],
          }
        }
      else
        return {
          text: `cool, so you wanna fly from ${s.departureCity} to ${city}.`,
          stateUpdate: _o(updateArrivalCity, updateDate),
          nextNode: 'stop',
          backtrack: {
            node: 'ChangeArrivalCity',
            flags: [ 'MISUNDERSTOOD', 'CLEAR_DATE'],
          }
        }

    }

    else {

      if (!s.departureCity)
        return {
          text: `so you wanna fly to ${city}, where are you departing from?`,
          stateUpdate: updateArrivalCity,
          nextNode: 'ProvideDepartureCity',
          backtrack: {
            node: 'ChangeArrivalCity',
            flags: [ 'MISUNDERSTOOD' ]
          }
        }
      else
        return {
          text: `cool, so you wanna fly from ${s.departureCity} to ${city}.`,
          stateUpdate: updateArrivalCity,
          nextNode: 'stop',
          backtrack: {
            node: 'ChangeArrivalCity',
            flags: [ 'MISUNDERSTOOD', 'CLEAR_DATE'],
          }
        }

    }

  }

  if (!city) {

    if (province)
      return {
        text: `so you wanna go to ${province}, but what city?`,
        nextNode: 'provideArrivalCity'
      }
    else
      return {
        text: `sorry, I didn't get what city you're trying to fly to`,
        nextNode: 'provideArrivalCity'
      }

  }
  */

}
