/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////

  const myQuestions  = [
    {
      question: "Which of the following gates is known as a universal gate?",
      answers: {
        a: "AND",
        b: "OR",
        c: "NAND",
        d: "XOR"
      },
      explanations: {
        a: "AND gate is not a universal gate.",
        b: "OR gate cannot construct all logic functions.",
        c: "NAND gate is a universal gate. <a href='https://en.wikipedia.org/wiki/NAND_gate'>Learn more</a>",
        d: "XOR is not a universal gate."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "What does SOP stand for in Boolean algebra?",
      answers: {
        a: "Sum of Powers",
        b: "Set of Products",
        c: "Sum of Products",
        d: "Series of Products"
      },
      explanations: {
        a: "Incorrect terminology.",
        b: "Close but not standard term.",
        c: "Correct. SOP means Sum of Products.",
        d: "Not a valid term in Boolean logic."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "The POS form of a Boolean expression is a product of:",
      answers: {
        a: "Products",
        b: "Sums",
        c: "Differences",
        d: "Quotients"
      },
      explanations: {
        a: "SOP is Sum of Products, not POS.",
        b: "Correct. POS = Product of Sums.",
        c: "Difference is not a Boolean term.",
        d: "Quotients do not apply here."
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "Which of the following expressions represents an AND gate?",
      answers: {
        a: "A + B",
        b: "A * B",
        c: "A / B",
        d: "A - B"
      },
      explanations: {
        a: "+ denotes OR gate.",
        b: "* represents AND in Boolean logic.",
        c: "Division is not used in Boolean algebra.",
        d: "Subtraction is invalid in logic."
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "Which logic gate produces a HIGH output only when both inputs are LOW?",
      answers: {
        a: "AND",
        b: "OR",
        c: "NOR",
        d: "XOR"
      },
      explanations: {
        a: "AND outputs HIGH only when both inputs are HIGH.",
        b: "OR outputs HIGH if at least one input is HIGH.",
        c: "Correct. NOR is the inverse of OR.",
        d: "XOR outputs HIGH when inputs differ."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "Which of the following is NOT a basic logic gate?",
      answers: {
        a: "AND",
        b: "OR",
        c: "XOR",
        d: "NOT"
      },
      explanations: {
        a: "AND is a basic gate.",
        b: "OR is a basic gate.",
        c: "XOR is a derived gate.",
        d: "NOT is a basic gate."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "Which expression is in canonical SOP form?",
      answers: {
        a: "A + B",
        b: "A'B + AB'",
        c: "A'B'C + ABC",
        d: "(A + B)(A + C)"
      },
      explanations: {
        a: "Not all combinations covered.",
        b: "Not fully canonical.",
        c: "Correct. Canonical SOP includes all variables.",
        d: "This is POS form."
      },
      correctAnswer: "c",
      difficulty: "intermediate"
    },
    {
      question: "How many input combinations are possible for a 3-variable truth table?",
      answers: {
        a: "4",
        b: "6",
        c: "8",
        d: "10"
      },
      explanations: {
        a: "2 variables give 4 combinations.",
        b: "Incorrect, not power of 2.",
        c: "Correct. 2^3 = 8.",
        d: "Wrong, not a power of 2."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "In SOP, a product term corresponds to a row where:",
      answers: {
        a: "Output is 0",
        b: "Input is 0",
        c: "Output is 1",
        d: "All inputs are same"
      },
      explanations: {
        a: "This is POS.",
        b: "Incorrect concept.",
        c: "Correct. Product terms are added for 1s.",
        d: "Unrelated to output."
      },
      correctAnswer: "c",
      difficulty: "intermediate"
    },
    {
      question: "Which logic gate outputs LOW only when all inputs are HIGH?",
      answers: {
        a: "NAND",
        b: "OR",
        c: "AND",
        d: "NOR"
      },
      explanations: {
        a: "Correct. NAND inverts AND.",
        b: "OR outputs HIGH with at least one HIGH input.",
        c: "AND outputs HIGH when all inputs are HIGH.",
        d: "NOR is an inverted OR."
      },
      correctAnswer: "a",
      difficulty: "beginner"
    }
  ];

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
