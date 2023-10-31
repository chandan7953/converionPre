// Javascript program to convert infix to prefix
// program to implement stack data structure
class Stack {
  constructor() {
    this.items = [];
  }

  // add element to the stack
  push(element) {
    return this.items.push(element);
  }

  // remove element from the stack
  pop() {
    if (this.items.length > 0) {
      return this.items.pop();
    }
  }

  // view the last element
  top() {
    return this.items[this.items.length - 1];
  }

  // check if the stack is empty
  isEmpty() {
    return this.items.length == 0;
  }

  // the size of the stack
  size() {
    return this.items.length;
  }

  // empty the stack
  clear() {
    this.items = [];
  }
}

function isalpha(c) {
  if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
    return true;
  }
  return false;
}

function isdigit(c) {
  if (c >= "0" && c <= "9") {
    return true;
  }
  return false;
}
function isOperator(c) {
  return !isalpha(c) && !isdigit(c);
}

function getPriority(C) {
  if (C == "-" || C == "+") return 1;
  else if (C == "*" || C == "/") return 2;
  else if (C == "^") return 3;
  return 0;
}

function infixToPostfix(infix) {
  infix = "(" + infix + ")";

  var l = infix.length;
  let char_stack = new Stack();
  var output = "";

  for (var i = 0; i < l; i++) {
    // If the scanned character is an
    // operand, add it to output.
    if (isalpha(infix[i]) || isdigit(infix[i])) output += infix[i];
    // If the scanned character is an
    // ‘(‘, push it to the stack.
    else if (infix[i] == "(") char_stack.push("(");
    // If the scanned character is an
    // ‘)’, pop and output from the stack
    // until an ‘(‘ is encountered.
    else if (infix[i] == ")") {
      while (char_stack.top() != "(") {
        output += char_stack.top();
        char_stack.pop();
      }

      // Remove '(' from the stack
      char_stack.pop();
    }

    // Operator found
    else {
      if (isOperator(char_stack.top())) {
        if (infix[i] == "^") {
          while (getPriority(infix[i]) <= getPriority(char_stack.top())) {
            output += char_stack.top();
            char_stack.pop();
          }
        } else {
          while (getPriority(infix[i]) < getPriority(char_stack.top())) {
            output += char_stack.top();
            char_stack.pop();
          }
        }

        // Push current Operator on stack
        char_stack.push(infix[i]);
      }
    }
  }
  while (!char_stack.isEmpty()) {
    output += char_stack.top();
    char_stack.pop();
  }

  return output;
}

function infixToPrefix(infix) {
  /* Reverse String
   * Replace ( with ) and vice versa
   * Get Postfix
   * Reverse Postfix * */
  var l = infix.length;

  // Reverse infix
  infix = infix.split("").reverse().join("");

  // Replace ( with ) and vice versa
  var infixx = infix.split("");
  for (var i = 0; i < l; i++) {
    if (infixx[i] == "(") {
      infixx[i] = ")";
    } else if (infixx[i] == ")") {
      infixx[i] = "(";
    }
  }
  infix = infixx.join("");

  var prefix = infixToPostfix(infix);

  // Reverse postfix
  prefix = prefix.split("").reverse().join("");
  return prefix;
}

/* Javascript implementation to convert
	infix expression to postfix*/

//Function to return precedence of operators
function prec(c) {
  if (c == "^") return 3;
  else if (c == "/" || c == "*") return 2;
  else if (c == "+" || c == "-") return 1;
  else return -1;
}

// The main function to convert infix expression
//to postfix expression
function infixToPostfixcc(s) {
  let st = []; //For stack operations, we are using JavaScript built in stack
  let result = "";

  for (let i = 0; i < s.length; i++) {
    let c = s[i];

    // If the scanned character is
    // an operand, add it to output string.
    if (
      (c >= "a" && c <= "z") ||
      (c >= "A" && c <= "Z") ||
      (c >= "0" && c <= "9")
    )
      result += c;
    // If the scanned character is an
    // ‘(‘, push it to the stack.
    else if (c == "(") st.push("(");
    // If the scanned character is an ‘)’,
    // pop and to output string from the stack
    // until an ‘(‘ is encountered.
    else if (c == ")") {
      while (st[st.length - 1] != "(") {
        result += st[st.length - 1];
        st.pop();
      }
      st.pop();
    }

    //If an operator is scanned
    else {
      while (st.length != 0 && prec(s[i]) <= prec(st[st.length - 1])) {
        result += st[st.length - 1];
        st.pop();
      }
      st.push(c);
    }
  }

  // Pop all the remaining elements from the stack
  while (st.length != 0) {
    result += st[st.length - 1];
    st.pop();
  }

  return result;
}

function prefixToPostfix(pre_exp) {
  function isOperator(x) {
    switch (x) {
      case "+":
      case "-":
      case "/":
      case "*":
        return true;
    }
    return false;
  }

  // Convert prefix to Postfix expression
  function preToPost(pre_exp) {
    let s = [];

    // length of expression
    let length = pre_exp.length;

    // reading from right to left
    for (let i = length - 1; i >= 0; i--) {
      // check if symbol is operator
      if (isOperator(pre_exp[i])) {
        // pop two operands from stack
        let op1 = s[s.length - 1];
        s.pop();
        let op2 = s[s.length - 1];
        s.pop();

        // concat the operands and operator
        let temp = op1 + op2 + pre_exp[i];

        // Push String temp back to stack
        s.push(temp);
      }

      // if symbol is an operand
      else {
        // push the operand to the stack
        s.push(pre_exp[i] + "");
      }
    }

    // stack contains only the Postfix expression
    return s[s.length - 1];
  }

  return preToPost(pre_exp);
}


function prefixToInfix(exp){
  
  
  function isOperator(x)
  {
    switch(x)
    {
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
      case '%':
        return true;
    }
    return false;
  }

  // Convert prefix to Infix expression
  function convert(str)
  {
    let stack = [];

    // Length of expression
    let l = str.length;

    // Reading from right to left
    for(let i = l - 1; i >= 0; i--)
    {
      let c = str[i];

      if (isOperator(c))
      {
        let op1 = stack[stack.length - 1];
        stack.pop()
        let op2 = stack[stack.length - 1];
        stack.pop()

        // Concat the operands and operator
        let temp = "(" + op1 + c + op2 + ")";
        stack.push(temp);
      }
      else
      {

        // To make character to string
        stack.push(c + "");
      }
    }
    return stack[stack.length - 1];
  }

  return convert(exp);
}


function postfixToprefix(exp){
  
  function isOperator(x)
  {
  
    switch (x) {
    case '+':
    case '-':
    case '/':
    case '*':
      return true;
    }
    return false;
  }
  
  // Convert postfix to Prefix expression
  function postToPre(post_exp)
  {
    let s = [];
  
    // length of expression
    let length = post_exp.length;
  
    // reading from right to left
    for (let i = 0; i < length; i++) {
  
      // check if symbol is operator
      if (isOperator(post_exp[i])) {
  
        // Pop two operands from stack
        let op1 = s[s.length - 1];
        s.pop();
        let op2 = s[s.length - 1];
        s.pop();
  
        // concat the operands and operator
        let temp = post_exp[i] + op2 + op1;
  
        // Push String temp back to stack
        s.push(temp);
      }
  
      // if symbol is an operand
      else {
  
        // Push the operand to the stack
        s.push(post_exp[i] + "");
      }
    }
  
    let ans = "";
    while (s.length > 0)
      ans += s.pop();
    return ans;
  }
    return postToPre(exp);
  }


  

function postfixToInfix(exp){
  
  function isOperand(x)
  {
    return (x >= 'a' && x <= 'z') ||
        (x >= 'A' && x <= 'Z');
  }
  
  // Get Infix for a given postfix
  // expression
  function getInfix(exp)
  {
    let s = [];
  
    for (let i = 0; i < exp.length; i++)
    {
      // Push operands
      if (isOperand(exp[i]))
      {
      s.push(exp[i] + "");
      }
  
      // We assume that input is
      // a valid postfix and expect
      // an operator.
      else
      {
        let op1 = s[s.length-1];
        s.pop();
        let op2 = s[s.length-1];
        s.pop();
        s.push("(" + op2 + exp[i] +
            op1 + ")");
      }
    }
  
    // There must be a single element
    // in stack now which is the required
    // infix.
    return s[s.length-1];
  }
  return getInfix(exp);
}

function clearExpression(expression) {
  let arr = expression.split("");
  let exper = arr.filter((value) => {
    return value != " ";
  });

  return exper.join("");
}

const res = document.getElementById("result");

document.getElementById("button").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission

  let expression = document.getElementById("expression").value;
  let expressionType = document.querySelector(
    'input[name="expressionType"]:checked'
  ).value;

  expression = expression.trim();
  expressionType = expressionType.trim();
  expression = clearExpression(expression);


  let exp = expression.trim();

  switch (expressionType) {
    case "infixToPrefix":
      res.innerHTML = `
      <p>expression ${exp}</p>
      <h1>prefix : ${infixToPrefix(exp)}</h1>
      `;
      break;
    case "infixToPostfix":
      res.innerHTML = `
      <p>expression ${exp}</p>
      <h1> Infix to postfix : ${infixToPostfixcc(exp)}</h1>
      `;
      break;

    case "prefixToPostfix":
      res.innerHTML = `
        <p>expression ${exp}</p>
        <h1>prefixToPostfix : ${prefixToPostfix(exp)}</h1>
        `;
      break;

    case "prefixToInfix":
      res.innerHTML = `
          <p>expression ${exp}</p>
          <h1>prefixToInfix : ${prefixToInfix(exp)}</h1>
          `;
      break;

    case "postfixToprefix":
      res.innerHTML = `
          <p>expression ${exp}</p>
          <h1>postfixToprefix : ${postfixToprefix(exp)}</h1>
          `;
      break;

    case "postfixToInfix":
      res.innerHTML = `
            <p>expression ${exp}</p>
            <h1>prefix : ${postfixToInfix(exp)}</h1>
            `;
      break;
    default:
      result.innerHTML = "Something Wrong";
  }
});

// This code is contributed by decode2207.
