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

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
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


  const myQuestions =  [
    {
      question: "Which logic gate outputs HIGH only when all inputs are HIGH?",
      answers: {
        a: "OR Gate",
        b: "AND Gate",
        c: "NOR Gate",
        d: "NAND Gate"
      },
      explanations: {
        a: "OR outputs HIGH when any input is HIGH.",
        b: "Correct. AND outputs HIGH only if all inputs are HIGH.",
        c: "NOR is the opposite of OR.",
        d: "NAND is the opposite of AND."
      },
      correctAnswer: "b",
      difficulty: "intermediate"
    },
    {
      question: "Which of the following expressions is a canonical SOP form?",
      answers: {
        a: "A + B",
        b: "AB + A'C",
        c: "A'B'C + AB'C'",
        d: "(A + B)(C + D)"
      },
      explanations: {
        a: "This is not in canonical form.",
        b: "This is SOP, but not canonical.",
        c: "Correct. It uses complete minterms.",
        d: "This is POS form."
      },
      correctAnswer: "c",
      difficulty: "intermediate"
    },
    {
      question: "The POS form of a logic function is a product of:",
      answers: {
        a: "Minterms",
        b: "Maxterms",
        c: "Constants",
        d: "Binary numbers"
      },
      explanations: {
        a: "Minterms are used in SOP.",
        b: "Correct. POS is based on maxterms.",
        c: "Constants are not involved directly.",
        d: "Binary numbers help form minterms/maxterms."
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "A NAND gate followed by a NOT gate behaves like which gate?",
      answers: {
        a: "AND",
        b: "NOR",
        c: "OR",
        d: "XOR"
      },
      explanations: {
        a: "Correct. NAND + NOT = AND.",
        b: "This combination doesn't produce NOR.",
        c: "Not the correct transformation.",
        d: "This needs more gates."
      },
      correctAnswer: "a",
      difficulty: "intermediate"
    },
    {
      question: "Which gate is known as a universal gate?",
      answers: {
        a: "AND",
        b: "XOR",
        c: "NAND",
        d: "OR"
      },
      explanations: {
        a: "AND alone is not universal.",
        b: "XOR is not universal.",
        c: "Correct. NAND can form any logic gate.",
        d: "OR alone is not universal."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "Which of these functions will be TRUE for inputs A=1, B=0, C=1?",
      answers: {
        a: "A'B + BC'",
        b: "AB + AC",
        c: "A + B'C",
        d: "A' + BC"
      },
      explanations: {
        a: "Evaluate with values: gives 0.",
        b: "Evaluate: AB = 0, AC = 1 → Result = 1. Correct.",
        c: "Evaluate: A=1, B'=1, C=1 → B'C = 1 → Result = 1, but not unique.",
        d: "Evaluate gives 1, but second term is 0."
      },
      correctAnswer: "b",
      difficulty: "advanced"
    },
    {
      question: "Which logic expression is equivalent to a NOR gate?",
      answers: {
        a: "(A + B)'",
        b: "AB",
        c: "A' + B'",
        d: "(AB)'"
      },
      explanations: {
        a: "Correct. NOR = NOT of OR.",
        b: "This is AND.",
        c: "DeMorgan’s expansion, not a gate.",
        d: "This is NAND."
      },
      correctAnswer: "a",
      difficulty: "beginner"
    },
    {
      question: "If a logic function has minterms m(0,2,3), what is its SOP form?",
      answers: {
        a: "A'B' + A'B + AB",
        b: "A + B",
        c: "AB + A'B'",
        d: "None of the above"
      },
      explanations: {
        a: "Correct. These represent minterms 0, 2, 3.",
        b: "Too generic.",
        c: "Incorrect combination.",
        d: "A correct form exists."
      },
      correctAnswer: "a",
      difficulty: "intermediate"
    },
    {
      question: "Which logic gate outputs LOW only when all inputs are HIGH?",
      answers: {
        a: "NAND",
        b: "NOR",
        c: "AND",
        d: "XOR"
      },
      explanations: {
        a: "Correct. NAND outputs LOW only if all inputs are HIGH.",
        b: "This is not correct.",
        c: "AND outputs HIGH for all HIGH inputs.",
        d: "XOR varies with input pattern."
      },
      correctAnswer: "a",
      difficulty: "intermediate"
    },
    {
      question: "Which of the following is NOT a valid SOP expression?",
      answers: {
        a: "A'B + AB'",
        b: "A + B + C",
        c: "AB + BC + AC",
        d: "(A + B)(A' + C)"
      },
      explanations: {
        a: "Valid SOP expression.",
        b: "Valid SOP expression.",
        c: "Valid SOP expression.",
        d: "Correct. This is POS, not SOP."
      },
      correctAnswer: "d",
      difficulty: "intermediate"
    }

    ///// To add more questions, copy the section below 
    									                  ///// this line


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */

  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
