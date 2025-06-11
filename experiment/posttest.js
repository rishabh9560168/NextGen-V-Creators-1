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


  const myQuestions = [
  {
    question: "1. Which of these functions will be TRUE for inputs A=1, B=0, C=1?",
    answers: {
      a: "A'B + BC'",
      b: "AB + AC",
      c: "A + B'C",
      d: "A' + BC"
    },
    correctAnswer: "b"
  },
  {
    question: "2. Which logic expression is equivalent to a NOR gate?",
    answers: {
      a: "(A + B)'",
      b: "AB",
      c: "A' + B'",
      d: "(AB)'"
    },
    correctAnswer: "a"
  },
  {
    question: "3. If a logic function has minterms m(0,2,3), what is its SOP form?",
    answers: {
      a: "A'B' + A'B + AB",
      b: "A + B",
      c: "AB + A'B'",
      d: "None of the above"
    },
    correctAnswer: "a"
  },
  {
    question: "4. Which logic gate outputs LOW only when all inputs are HIGH?",
    answers: {
      a: "NAND",
      b: "NOR",
      c: "AND",
      d: "XOR"
    },
    correctAnswer: "a"
  },
  {
    question: "5. Which of the following is NOT a valid SOP expression?",
    answers: {
      a: "A'B + AB'",
      b: "A + B + C",
      c: "AB + BC + AC",
      d: "(A + B)(A' + C)"
    },
    correctAnswer: "d"
  },
  {
    question: "6. What is the main goal of converting a logic expression into SOP or POS form?",
    answers: {
      a: "To increase circuit size",
      b: "To add more gates",
      c: "To simplify implementation and optimize digital circuit design",
      d: "To make the circuit look complex"
    },
    correctAnswer: "c"
  };

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
