# await-state

await a desired redux state

## Usage

```js
import awaitState from 'await-state'

const isLoadedSelector = (state) => state.matrix.isLoaded

// resolves immediately if the condition is already true
// or later, whenever it becomes true
await awaitState(store, isLoadedSelector)

// state.matrix.isLoaded is true!
```

## API

`awaitState(store, selector)`

- `store` is a Redux store
- `selector` is a Redux selector that returns a boolean value

Returns a `Promise` that resolves when `selector` returns `true`
