
// function Animal(name) {
//     this.name = name;
// }

// Animal.prototype.speak = function() {
//     console.log(`${this.name} makes a sound.`);
// };

// function Dog(name) {
//     Animal.call(this, name);
// }

// Dog.prototype = Object.create(Animal.prototype);
// Dog.prototype.constructor = Dog;

// Dog.prototype.bark = function() {
//     console.log(`${this.name} barks.`);
// };

// const myDog = new Dog("Buddy");
// myDog.speak(); // Buddy makes a sound.
// myDog.bark();  // Buddy barks.