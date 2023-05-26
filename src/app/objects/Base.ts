export class BaseObject {
  constructor(object?) {
    if (object != null) {
      if (this.constructor.name == object.constructor.name) {
        let obj = Object.keys(object);
        for (let i = 0; i < Object.keys(object).length; i++) {
          let value = obj[i];
          this[value] = object[value];
        }
      }
    }
  }
  equals(object) {
    if (this.constructor.name != object.constructor.name) {
      return false;
    }
    let obj = Object.keys(this);
    for (let i = 0; i < Object.keys(this).length; i++) {
      let value = obj[i];
      if (value in object) {
        if (object[value] != this[value]) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
  protected static normalizeBoolean(object): boolean {
    if (typeof object == 'boolean') {
      return object;
    }
    if (typeof object == 'string') {
      return object == '1' ? true : false;
    }
    if (typeof object == 'number') {
      return object == 1 ? true : false;
    }
    if (object == null) {
      return false;
    }
    return false;
  }
  protected normalizeBoolean(object): boolean {
    if (typeof object == 'boolean') {
      return object;
    }
    if (typeof object == 'string') {
      return object == '1' ? true : false;
    }
    if (typeof object == 'number') {
      return object == 1 ? true : false;
    }
    if (object == null) {
      return false;
    }
    return false;
  }
}
