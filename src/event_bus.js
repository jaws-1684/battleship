export class EventBus {
  static events = {};
  static emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data);
      });
    }
  }

  static subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }
  static unsubscribe(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
  static purge() {
    EventBus.events = {};
  }
  static show() {
    console.log(this.events);
  }

  static bulk(action, ...eventNames) {
    let evts = Object.assign({}, ...eventNames);

    for (let [key, value] of Object.entries(evts)) {
      switch (action) {
        case "subscribe":
          EventBus.emit(key + "-on");
          EventBus.subscribe(key, value);
          break;
        case "unsubscribe":
          EventBus.emit(key + "-off");
          EventBus.unsubscribe(key, value);
          break;
        case "restart":
          EventBus.emit(key + "-off");
          EventBus.unsubscribe(key, value);
          EventBus.emit(key + "-on");
          EventBus.subscribe(key, value);
          break;
      }
    }
  }
}
