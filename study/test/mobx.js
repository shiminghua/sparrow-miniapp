// import { observable, autorun } from 'mobx';
const mobx = require('mobx');
let { observable, autorun, computed, action, decorate, } = mobx;

// let todoStore = observable({
//   todos: [],
//   get completedCount() {
//     return this.todos.filter(todo => todo.completed).length;
//   },
// });

// autorun(function () {
//   console.log('Complete %d of %d items', todoStore.completedCount, todoStore.todos.length);
// });

// todoStore.todos[0] = {
//   title: 'take a walk',
//   completed: false,
// };

// todoStore.todos[0].completed = true;

// // class OrderLine {
// //   @observable price = 0;
// //   @observable amount = 1;

// //   @computed get total() {
// //     return this.price * this.amount;
// //   }
// // }

// // let orderLine = new OrderLine();
// // orderLine.price = 50;
// // console.log(orderLine.total);

// let person = observable({
//   name: 'john',
//   age: 42,
//   showAge: false,

//   get labelText() {
//     return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
//   },

//   setAge(age) {
//     this.age = age;
//   },
// }, {
//   setAge: action,
// });

// autorun(() => console.log(person.labelText));

// person.name = 'Dave';
// person.setAge(21);


class Person {
  name = 'John';
  age = 42;
  showAge = false;

  get labelText() {
    return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
  }

  setAge(age) {
    this.age = age;
  }
}

decorate(Person, {
  name: observable,
  age: observable,
  showAge: observable,
  labelText: computed,
  setAge: action,
});

let person2 = new Person();

autorun(() => console.log(person2.labelText));
autorun(() => console.log(person2.age));

person2.name = 'minghua';
person2.age = 30;
person2.showAge = true;
person2.setAge(40);
