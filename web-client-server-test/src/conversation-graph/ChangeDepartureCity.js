export function ChangeDepartureCity (m, s, n, f) {
  if(f.includes('MISUNDERSTOOD')){
    return {
      text: `
        sorry, maybe I misunderstood.
        what city are you leaving from?
      `,
      stateUpdate: { departureCity: undefined },
      nextNode: 'ProvideDepartureCity'
    }
  }
}
