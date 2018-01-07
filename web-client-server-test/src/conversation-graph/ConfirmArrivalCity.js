export function ConfirmArrivalCity (m, s, n, f) {

    const haveIntent = (intent) => m.intents.find(i => i.intent == intent)
    const arrivalCityConfirmed = { arrivalCityConfirmed: true }

    if (haveIntent('confirm'))
      return n('ProvideArrivalCity')(m, s, n, [ 'USE_EXISTING' ])
    else if (haveIntent('backtrack'))
      return {
        text: `
          ok, so you don't want to fly to ${s.arrivalCity}.
          where are you looking to fly to?
        `,
        stateUpdate: { arrivalCity: undefined },
        nextNode: 'ProvideArrivalCity'
      }
    else
      return {
        text: `
          sorry, i didnt get that..
          do you still want to fly to ${s.arrivalCity}?
        `,
        nextNode: 'ConfirmArrivalCity'
      }

}
