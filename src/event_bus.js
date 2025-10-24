export class EventBus {
  static events = {}
  static emit (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }

  static subscribe (eventName, fn) {
     console.log(this.events)
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn)
  }
  static unsubscribe (eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  }
  static purge() {
    EventBus.events = {}
  }
  static show () {
    console.log(this.events)
  }
}