# JavaScript Basic Concepts

## 1️⃣ What is the difference between var, let, and const?

**Answer:**

var, let and const are used to declare variables in JavaScript.

**var:**  
This is the old way to declare a variable. It is function scoped and can be redeclared and updated. Sometimes it can create confusion because it does not follow block scope.

**let:**  
This is the modern way to declare a variable. It is block scoped. We can update the value but we cannot redeclare the same variable in the same scope.

**const:**  
This is also block scoped. But its value cannot be updated or redeclared after it is assigned. It is mainly used when the value should stay fixed.

---

## 2️⃣ What is the spread operator (...)?

**Answer:**

The spread operator `...` is used to expand elements of an array or object. It helps to copy or merge arrays and objects easily.

For example, we can copy an array or combine multiple arrays using the spread operator instead of writing long code.

---

## 3️⃣ What is the difference between map(), filter(), and forEach()?

**Answer:**

**map():**  
This method is used to create a new array by applying a function to every element of the original array.

**filter():**  
This method is used to create a new array that contains only the elements that match a specific condition.

**forEach():**  
This method is used to loop through each element of an array, but it does not return a new array. It is mainly used to perform some action on each element.

---

## 4️⃣ What is an arrow function?

**Answer:**

An arrow function is a shorter way to write functions in JavaScript. It uses the `=>` symbol instead of the traditional `function` keyword. It makes the code cleaner and easier to write, especially for small functions.

---

## 5️⃣ What are template literals?

**Answer:**

Template literals are a way to write strings in JavaScript using backticks `` ` ` ``. They allow us to insert variables inside a string using `${}` and also support multi-line strings easily. This makes string formatting simpler compared to normal quotes.