/* eslint-env jest */
const Redux = require('redux')
const awaitState = require('.')

const initialState = { enabled: false }

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_ENABLED':
      return { ...state, enabled: !state.enabled }
    case 'OTHER_ACTION':
      return { ...state, someOtherProperty: 42 }
    default:
      return state
  }
}

const isEnabledSelector = (store) => !!store.enabled
const isDisabledSelector = (store) => !store.enabled

let store

beforeEach(() => {
  store = Redux.createStore(reducer)
})

test('awaitState waits for state to update', async () => {
  // queue up actions
  setTimeout(() => store.dispatch({ type: 'TOGGLE_ENABLED' }), 1000)

  expect(store.getState().enabled).toBe(false)
  await awaitState(store, isEnabledSelector)
  expect(store.getState().enabled).toBe(true)
})

test('awaitState resolves immediately if the condition already exists', async () => {
  await awaitState(store, isDisabledSelector) // shouldn't hang
  expect(store.getState().enabled).toBe(false)
})

test('awaitState ignores irrelevant updates', async () => {
  // queue up actions
  setTimeout(() => store.dispatch({ type: 'OTHER_ACTION' }), 1000)
  setTimeout(() => store.dispatch({ type: 'TOGGLE_ENABLED' }), 2000)

  expect(store.getState().enabled).toBe(false)
  await awaitState(store, isEnabledSelector)
  expect(store.getState().enabled).toBe(true)
})
