import React from 'react';

import './explanations.css';


function ExplanationPage() {
  return (
	<div className='background background-blue'>

	<div className='height-title'>
		<h1 className="page-title">Programming Concepts Explanation</h1>
	</div>


    <div className="explanation-page">

      <section className="concept-section">
        <h2 className="concept-heading">console.log </h2>
        <p className="concept-description">
          The <span className="keyword">console.log</span> function is used to output messages to the console. It is commonly used for debugging and displaying information during development. Example:
        </p>
        <pre className="concept-code">
          <code>
            {`console.log("Hello, world!");`}
          </code>
        </pre>
      </section>



      <section className="concept-section">
        <h2 className="concept-heading">If Statement</h2>
        <p className="concept-description">
          An <code>if</code> statement is used to execute a block of code if a specified condition is true. Example:
        </p>
        <pre className="concept-code">
            <code>
                {`if (condition) {\n\t// code to be executed\n}`}
            </code>
        </pre>
      </section>

      <section className="concept-section">
        <h2 className="concept-heading">If-Else Statement</h2>
        <p className="concept-description">
          An <span className="keyword">if-else</span> statement is used to execute a block of code if a specified condition is true, and a different block of code if the condition is false. Example:
        </p>
        <pre className="concept-code">
          <code>
            {`if (condition) {\n\t// code to be executed if condition is true\n} else {\n\t// code to be executed if condition is false\n}`}
          </code>
        </pre>
      </section>

      <section className="concept-section">
        <h2 className="concept-heading">For Loop</h2>
        <p className="concept-description">
          A <code>for</code> loop is used to iterate over a block of code for a specific number of times. It consists of an initialization, a condition, and an increment/decrement. Example:
        </p>
        <pre className="concept-code">
          <code>
            {`for (let i = 0; i < 5; i++) {\n\t// code to be executed\n}`}
          </code>
        </pre>
      </section>


    <section className="concept-section">
        <h2 className="concept-heading">Nested For Loops</h2>
        <p className="concept-description">
          Nested <span className="keyword">for</span> loops are used when you need to perform iterations within iterations. They allow you to iterate over multiple levels of data structures, such as multi-dimensional arrays. Example:
        </p>
        <pre className="concept-code">
          <code>
            {`for (let i = 0; i < 3; i++) {\n\tfor (let j = 0; j < 3; j++) {\n\t\t// code to be executed\n\t}\n}`}
          </code>
        </pre>
    </section>


    <section className="concept-section">
        <h2 className="concept-heading">While Loop</h2>
        <p className="concept-description">
            A <span className="keyword">while</span> loop is used to repeatedly execute a block of code as long as a specified condition is true. Example:
        </p>
        <pre className="concept-code">
            <code>
            {`while (condition) {\n\t// code to be executed\n}`}
            </code>
        </pre>
    </section>

	<section className="concept-section">
		<h2 className="concept-heading">Variables</h2>
		<p className="concept-description">
			In JavaScript, variables are used to store and manipulate data. They provide a way to refer to values by name. You can declare variables using the `let` or `const` keyword, followed by the variable name. Here's an example:
		</p>
		<pre className="concept-code">
			<code>
			{`let age = 25;\nconst name = "John";\nlet isStudent = true;`}
			</code>
		</pre>
		<p className="concept-description">
			In the example above, we declared three variables: `age`, `name`, and `isStudent`. The `let` keyword is used for variables whose value can be changed, while the `const` keyword is used for variables whose value remains constant. You can assign values of different types, such as numbers, strings, booleans, etc., to variables.
		</p>
		<p className="concept-description">
			Variables allow you to store and manipulate data throughout your program. You can perform various operations on variables, such as assigning new values, performing calculations, and using them in conditional statements and loops.
		</p>
	</section>

    <section className="concept-section">
        <h2 className="concept-heading">Boolean Values</h2>
        <p className="concept-description">
             In JavaScript, a boolean is a data type that represents either true or false. Boolean values are commonly used in conditional statements and logical operations. Here are some examples:
        </p>
        <pre className="concept-code">
            <code>
            {`let isTrue = true;\nlet isFalse = false;\nconsole.log(isTrue); // true\nconsole.log(isFalse); // false`}
            </code>
        </pre>
        <p className="concept-description">
            You can assign boolean values to variables and use them to control the flow of your program. Conditional statements like <code>if</code> and <code>while</code> rely on boolean expressions to determine the execution path.
        </p>
    </section>

    <section className="concept-section">
        <h2 className="concept-heading">Equality and Comparison Conditions</h2>
        <p className="concept-description">
            In JavaScript, you can use various comparison operators to evaluate equality, greater than, and less than conditions. These operators return a boolean value (true or false) based on the comparison result. Here are some examples:
        </p>
        <pre className="concept-code">
            <code>
            {`let a = 5;\nlet b = 10;\nconsole.log(a === b); // false \nconsole.log(a > b); // false\nconsole.log(a < b); // true`}
            </code>
        </pre>
        <p className="concept-description">
            The <code>===</code> operator checks for strict equality, while the <code>></code> and <code>&lt;</code> operators evaluate greater than and less than conditions, respectively.
        </p>
    </section>


	<section className="concept-section">
		<h2 className="concept-heading">Logical Operators</h2>
		<p className="concept-description">
			In JavaScript, logical operators are used to perform logical operations on boolean values. There are two main logical operators: `||` (logical OR) and `&&` (logical AND).
		</p>
		<p className="concept-description">
			The logical OR (`||`) operator returns `true` if at least one of the operands is `true`, otherwise it returns `false`.
		</p>
		<pre className="concept-code">
			<code>
			{`let result = (condition1 || condition2);`}
			</code>
		</pre>
		<p className="concept-description">
			In the example above, the variable `result` will be `true` if either `condition1` or `condition2` is `true`, otherwise it will be `false`.
		</p>
		<p className="concept-description">
			The logical AND (`&&`) operator returns `true` if both operands are `true`, otherwise it returns `false`.
		</p>
		<pre className="concept-code">
			<code>
			{`let result = (condition1 && condition2);`}
			</code>
		</pre>
		<p className="concept-description">
			In the example above, the variable `result` will be `true` only if both `condition1` and `condition2` are `true`, otherwise it will be `false`.
		</p>
	</section>


	<section className="concept-section">
		<h2 className="concept-heading">Strings</h2>
		<p className="concept-description">
			In JavaScript, a string is a sequence of characters enclosed in single quotes (`'`) or double quotes (`"`). It is used to represent textual data. You can use strings to store and manipulate text-based information, such as names, messages, and more. Example:
		</p>
		<pre className="concept-code">
			<code>
			{`let message = "Hello, world!";`}
			</code>
		</pre>
		<p className="concept-description">
			In the example above, the variable `message` holds the string "Hello, world!". Strings can be concatenated using the plus (`+`) operator to combine multiple strings into a single string.
		</p>
	</section>



    <section className="concept-section">
        <h2 className="concept-heading">Arrays</h2>
        <p className="concept-description">
          An array is a data structure that stores a collection of elements. It allows you to store multiple values in a single variable. Example:
        </p>
        <pre className="concept-code">
          <code>
            {`const array = [1, 2, 3, 4, 5];`}
          </code>
        </pre>
    </section>

	<section className="concept-section">
		<h2 className="concept-heading">Array Length</h2>
		<p className="concept-description">
			In JavaScript, you can determine the length of an array using the `length` property. The `length` property returns the number of elements in the array.
		</p>
		<p className="concept-description">
			To access the length of an array, you can use the following syntax:
		</p>
		<pre className="concept-code">
			<code>
			{`let array = [1, 2, 3, 4, 5];\nlet length = array.length;`}
			</code>
		</pre>
		<p className="concept-description">
			In the example above, the variable `length` will be assigned the value `5`, which is the number of elements in the `array`.
			The `length` property is useful when you need to iterate over an array or perform operations based on its size.
		</p>

	</section>



    <section className="concept-section">
        <h2 className="concept-heading">Accessing Array Elements</h2>
        <p className="concept-description">
            In JavaScript, arrays are ordered lists of values. You can access individual elements in an array using their index. The index starts from 0 for the first element and increments by 1 for each subsequent element. Here's an example:
        </p>
        <pre className="concept-code">
            <code>
            {`let numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers[0]); // 1\nconsole.log(numbers[2]); // 3\nconsole.log(numbers[4]); // 5`}
            </code>
        </pre>
        <p className="concept-description">
            To access an element, you need to use the array name followed by the index enclosed in square brackets. This allows you to retrieve the value stored at that particular position in the array.
        </p>
    </section>


    <section className="concept-section">
        <h2 className="concept-heading">Switch-Case Statement</h2>
        <p className="concept-description">
          A <span className="keyword">switch-case</span> statement is used to perform different actions based on different conditions. Example:
        </p>
        <pre className="concept-code">
          <code>
                {`switch (expression) {\n\tcase value1: \n\t\t// code to be executed if expression matches value1\n\t\tbreak;\n\tcase value2:\n\t\t// code to be executed if expression matches value2\n\t\tbreak;\n\tdefault:\n\t\t// code to be executed if expression doesn't match any case\n}`}
          </code>
        </pre>
    </section>


	<section className="concept-section">
		<h2 className="concept-heading">Functions</h2>
		<p className="concept-description">
			Functions are reusable blocks of code that perform a specific task. They allow you to group code together and execute it multiple times with different inputs.
		</p>
		<p className="concept-description">
			In JavaScript, you can define a function using the `function` keyword, followed by the function name, a set of parentheses for parameters (if any), and curly braces for the function body.
		</p>
		<p className="concept-description">
			Here's an example of a function that calculates the sum of two numbers:
		</p>
		<pre className="concept-code">
			<code>
			{`function addNumbers(a, b) {\n\treturn a + b;\n}`}
			</code>
		</pre>
		<p className="concept-description">
			In the example above, the function `addNumbers` takes two parameters `a` and `b`, and returns the sum of the two numbers. You can call this function and pass different arguments to get different results.
			Functions are essential for code organization, reusability, and modular programming. They allow you to break down complex tasks into smaller, manageable parts.
		</p>
	</section>



    </div>
	</div>
  );
}

export default ExplanationPage;