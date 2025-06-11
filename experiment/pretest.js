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
    question: "1. लॉजिक गेट क्या है?",
    answers: {
      a: "एक प्रकार का कंप्यूटर",
      b: "एक सॉफ्टवेयर प्रोग्राम",
      c: "डिजिटल सर्किट का एक मूल निर्माण खंड जो लॉजिक ऑपरेशन करता है",
      d: "एक मेमोरी डिवाइस"
    },
    correctAnswer: "c"
  },
  {
    question: "2. SOP फॉर्म में एक्सप्रेशन कैसे लिखा जाता है?",
    answers: {
      a: "AND of ORs",
      b: "OR of ANDs",
      c: "NOT of ANDs",
      d: "XOR of ORs"
    },
    correctAnswer: "b"
  },
  {
    question: "3. POS फॉर्म में एक्सप्रेशन किस रूप में होता है?",
    answers: {
      a: "AND of ORs",
      b: "OR of NOTs",
      c: "OR of ANDs",
      d: "AND of ORs"
    },
    correctAnswer: "d"
  },
  {
    question: "4. यदि किसी ट्रुथ टेबल में अंतिम कॉलम का मान '1' है, तो SOP में उस रो का योगदान कैसा होगा?",
    answers: {
      a: "0 को दर्शाएगा",
      b: "एक प्रॉडक्ट टर्म जो सभी वेरिएबल्स का AND है",
      c: "एक सम टर्म जो सभी वेरिएबल्स का OR है",
      d: "उसका कोई योगदान नहीं होता"
    },
    correctAnswer: "b"
  },
  {
    question: "5. SOP और POS एक्सप्रेशन्स के बीच मुख्य अंतर क्या है?",
    answers: {
      a: "SOP में XOR गेट्स प्रयोग होते हैं जबकि POS में नहीं",
      b: "SOP में प्रॉडक्ट टर्म्स का OR होता है, POS में सम टर्म्स का AND होता है",
      c: "SOP सिर्फ OR गेट का उपयोग करता है",
      d: "POS में लॉजिक गेट्स की आवश्यकता नहीं होती"
    },
    correctAnswer: "b"
  },
  {
    question: "6. ट्रुथ टेबल से SOP फॉर्म कैसे प्राप्त किया जाता है?",
    answers: {
      a: "जहाँ आउटपुट '1' है, वहां से वेरिएबल्स का प्रॉडक्ट लिया जाता है",
      b: "जहाँ आउटपुट '0' है, वहां से वेरिएबल्स का प्रॉडक्ट लिया जाता है",
      c: "सिर्फ पहले रो को देखा जाता है",
      d: "हर वेरिएबल को NOT कर दिया जाता है"
    },
    correctAnswer: "a"
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
