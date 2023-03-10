const events = require('events')
const eventEmitter = new events.EventEmitter()

class ObserverClass {
  constructor() {
    this.listObserver = []
  }

  on(key, func) {
    eventEmitter.on(key, func)
  }

  emit(key, object) {
    eventEmitter.emit(key, object)
  }

  removeListener(key, func) {
    eventEmitter.removeListener(key, func)
  }
}

const Observer = new ObserverClass()
Object.freeze(Observer)

export default Observer
