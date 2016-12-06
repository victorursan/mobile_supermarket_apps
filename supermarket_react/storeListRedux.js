// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: (item) => {
    return {type: types.ADD, payload: item}
  },
  remove: (index) => {
    return {type: types.REMOVE, payload: index}
  }
}

// Initial state of the store
const initialState = {
  store: [{ "identifier": "123", "name": "ceva", "price": "123.123", "description": "asd"},
     { "identifier": "124", "name": "cev", "price": "321.1", "description": "asd3"},
     { "identifier": "125", "name": "ve", "price": "123", "description": "asd2"},
     { "identifier": "126", "name": "a", "price": "33", "description": "asd1"},],
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
  const {store} = state
  const {type, payload} = action

  switch (type) {
    case types.ADD: {
      return {
        ...state,
        store: [payload, ...store],
      }
    }
    case types.REMOVE: {
      return {
        ...state,
        store: store.filter((element, i) => i !== payload),
      }
    }
  }

  return state
}

