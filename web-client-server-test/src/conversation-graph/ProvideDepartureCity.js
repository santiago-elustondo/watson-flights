export function ProvideDepartureCity (m, s, n) {

  // this should be a parent class method with hook
  if (m.intents.find(i => i.intent == 'backtrack')) {
    const frame = s.history.slice(-1)[0]
    const bt = frame.backtrack
    return n(bt.node)(m, s, n, bt.flags)
  }

  const grabFirstEntity = (entity) => ( m.entities.find(e => e.entity == entity) || {} ).value
  const city = grabFirstEntity('City')

  if (city) {

    const updateDepartureCity = { departureCity: city }

    if (!s.arrivalCity)
      return {
        text: `
          cool, so you're leaving from ${city},
          where are you flying to?
        `,
        stateUpdate: updateDepartureCity,
        nextNode: 'ProvideArrivalCity',
        backtrack: {
          node: 'ChangeDepartureCity',
          flags: [ 'MISUNDERSTOOD' ]
        }
      }
    else
      return {
        text: `cool, so you wanna fly from ${city} to ${s.arrivalCity}.`,
        stateUpdate: updateDepartureCity,
        nextNode: 'stop'
      }

  }

  else
    return {
      text: `sorry, I didn't get what city you're trying to fly to`,
      nextNode: 'ProvideArrivalCity'
    }

}
