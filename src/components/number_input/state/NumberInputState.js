import { makeObservable, observable, action } from 'mobx';

class NumberInputState {
  value = 0;
  step = 0;
  min = 0;
  onChange = () => {};

  constructor() {
    makeObservable(this, {
      step: observable,
      min: observable,
      value: observable,
      onChange: observable,
      incrementValue: action,
      decrementValue: action
    });
  }


  receiveProps({value, step, min, onChange}) {
    this.value = value;
    this.step = step;
    this.min = min;
    this.onChange = onChange;
  }

  incrementValue() {
    this.value += this.step;
    this.onChange(this.value);
  }

  decrementValue() {
    if (this.value - this.step >= this.min) this.value -= this.step;
    this.onChange(this.value);
  }
}

export default NumberInputState;

