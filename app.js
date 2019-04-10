var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "What was smart cute and filled with polyfill?",
  answers: ["Bill Nye", "Roger Rabbit", "Charzard", "Cousin Skeeter"],
  correctAnswer: "Cousin Skeeter",
  image: "assets/images/cousinSkeeter.jpg"
}, {
  question: "Who was relaxin, maxin all kool?",
  answers: ["Dj Jazzy Jeff", "Mystikal", "Malcolm", "Fresh Prince"],
  correctAnswer: "Fresh Prince",
  image: "assets/images/FreshPrince.jpg"
}, {
  question: "Who's Awkward",
  answers: ["Waldo", "Sabrina", "Micheal Jackson", "Insecure"],
  correctAnswer: "Inscure",
  image: "assets/images/insecure.jpg"
}, {
  question: "Where the legends live",
  answers: ["Rock Star", "Backstreet Boys", "legends of the Hidden Temple", "No Doubt"],
  correctAnswer: "Nirvana",
  image: "assets/images/Legends-Of-The-Hidden-Temple.jpg"
}, {
  question: "What's UUUUUUUUP?",
  answers: ["Aladdin", "Hercules", "Martin", "The Lion King"],
  correctAnswer: "Martin",
  image: "assets/images/martin.jpg"
}, {
  question: "Whiskey or Brandy",
  answers: ["Dice", "Mirror", "Fresh", "moesha"],
  correctAnswer: "moesha",
  image: "assets/images/moesha.jpg"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    card.html("<h2>Times UP!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    card.html("<h2>Check out how you did!</h2>");

    $("#counter-number").text(this.counter);

    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});
