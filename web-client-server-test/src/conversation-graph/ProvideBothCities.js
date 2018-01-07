export function ProvideBothCities (m, s, n, f) {

  const places = m.entities.filter(e => e.entity == 'City' || e.entity == 'Province')

  const entityAfterWord = (word) => places.find(p =>
    m.input.text.slice(0, p.location[0]).trim().split(' ').pop().toLowerCase() == word
  )

  const arrivalPlace = entityAfterWord('to')
  const departurePlace = entityAfterWord('from')

  if ( arrivalPlace
    && departurePlace
    && arrivalPlace.entity == 'City'
    && departurePlace.entity == 'City'
  ) return {
    text: `cool, so you want to go from ${departurePlace.value} to ${arrivalPlace.value}`,
    nextNode: 'Start',
    stateUpdate: {
      arrivalCity: arrivalPlace.value,
      departureCity: departurePlace.value
    },
    backtrack: {
      node: 'ChangeArrivalCity',
      flags: [
        'MISUNDERSTOOD',
        'CLEAR_BOTH'
      ]
    }
  }

  // fill in other options

  if (!s.arrivalCity)
    return {
      text: `sorry, i didn't get that. what city are you looking to fly to?`,
      nextNode: `ProvideArrivalCity`,
    }
  else
    return {
      text: `sorry, i didn't get that. did you still want to fly to ${s.arrivalCity}?`,
      nextNode: `ConfirmArrivalCity`
    }

}
