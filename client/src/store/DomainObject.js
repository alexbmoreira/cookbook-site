import { action, computed, makeObservable, toJS } from 'mobx';
import _ from 'lodash';

class DomainObject {
  constructor(model) {
    makeObservable(this, {
      merge: action,
      isNew: computed
    });
  }

  merge(model, relations = {}) {
    if (!model) return;
    Object.assign(this, model);

    _.forOwn(relations, (value, key) => {
      if (_.isArray(value)) {
        this.hasMany(key, model, value[0]);
      } else {
        this.hasOne(key, model, value);
      }
    });
  }

  hasOne(name, other, _class) {
    if (other[name]) {
      this[name] = new _class(this[name]);
      this[name].merge(other[name]);
    }
  }

  hasMany(name, other, _class) {
    if (other[name]) {
      this[name] = this[name].map(t => new _class(t));
      for (const t of this[name]) {
        if (!t.id) continue;

        const existingItem = _.find(other[name], { id: t.id });
        t.merge(existingItem);
      }
    }
  }

  hasLink(linkName) {
    return _.has(this.links, `${linkName}.href`);
  }

  get isNew() {
    return !this.id;
  }

  toJS() {
    return toJS(this);
  }
}

export default DomainObject;
