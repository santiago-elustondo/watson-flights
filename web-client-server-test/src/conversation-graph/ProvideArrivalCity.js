export function ProvideArrivalCity (m, s, n, f) {

  const haveFlag = (flag) => f.find(f => f == flag)
  const grabFirstEntity = (entity) => ( m.entities.find(e => e.entity == entity) || {} ).value

  const city = haveFlag('USE_EXISTING') ? grabFirstEntity('City') : s.arrivalCity
  const province = grabFirstEntity('Province')

  if (city) {

    const updateArrivalCity = { arrivalCity: city }

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
        nextNode: 'stop'
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

}
