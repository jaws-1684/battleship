export class Param {
  static params = {};
  static getParam(paramName) {
    return this.params[paramName] 
  }

  static setParam(paramName, value) {
    this.params[paramName] = value
  }
  static bulkSet(object={}) {
    Object.keys(object).forEach(key => this.params[key] = object[key])
  }
  static bulkGet(...keys) {
    let result = []
    keys.forEach(key => result.push(this.params[key]))
    return result
  }

  static purge() {
    this.params = {};
  }
  static show() {
    console.log(this.params);
  }
}