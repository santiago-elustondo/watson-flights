export function ChangeArrivalCity (m, s, n, f) {

  if(f.includes('MISUNDERSTOOD'))
    return {
      text: `
        sorry, maybe I misunderstood.
        what city are you looking to fly to?
      `,
      stateUpdate: {
        arrivalCity: undefined,
        departureCity: f.includes('CLEAR_BOTH') ? undefined : s.departureCity
      },
      nextNode: 'ProvideArrivalCity'
    }

}
