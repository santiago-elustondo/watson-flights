export function Start (m, s, n) {

  if (!m.input.text && !s.saidHi) // init message is blank
    return {
      text: 'hello! can i help you?',
      stateUpdate: { saidHi: true },
      nextNode: 'Start'
    }


  if (m.intents.find(i => i.intent == 'info-location-both'))
    return n('ProvideBothCities')(m, s, n)

  if (m.intents.find(i => i.intent == 'info-location-arrival'))
    return n('ProvideArrivalCity')(m, s, n)

  if (m.intents.find(i => i.intent == 'info-location-departure'))
    return n('ProvideDepartureCity')(m, s, n)


  return {
    text: `umm, sorry what?`,
    nextNode: 'Start'
  }

}
