import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { updateArrivalCity } from '../actions/flightsActions'
import rp from 'request-promise'

window.rp = rp

// hooking into @@init is antipattern

function* mySaga() {

  const flights = yield rp(`http://localhost:3004/flights`).then(data => JSON.parse(data)) 
  yield put({ type: 'NEW_LIST', flights })

  yield takeLatest(['SET_ARRIVAL_CITY'], function* ({ params }) {
    const flights = yield rp(`http://localhost:3004/flights?arrival_city=${params.city}`).then(data => JSON.parse(data))
    yield put({ type: 'NEW_LIST', flights })
  })
}

export default mySaga
