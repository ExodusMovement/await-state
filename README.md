# await-state

await a desired redux state

## Usage

```js
import awaitState from 'await-state'

// resolves immediately if the condition is already true
// or later, whenever it becomes true
await awaitState(store, booleanReturningSelector); // e.g. (state) => state.matrix.isLoaded

// the condition booleanReturningSelector is true!
```
