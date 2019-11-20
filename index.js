module.exports = (store, areWeThereYet) =>
  new Promise((resolve) => {
    if (areWeThereYet(store.getState())) return resolve()

    const unsubscribe = store.subscribe(() => {
      if (areWeThereYet(store.getState())) {
        resolve()
        unsubscribe()
      }
    })
  })
