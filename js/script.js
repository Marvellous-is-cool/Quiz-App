//selecting all required elements
const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const ansIcon = document.querySelector(".ans_icon");
const start_fr_pg = document.querySelector(".fr_page");

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
  start_fr_pg.style.display = "none";
  document.title = "Quiz - Instruction";
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  start_fr_pg.style.display = "block"; //hide info box
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(20); //calling startTimer function
  startTimerLine(550); //calling startTimerLine function
  document.title = "Quiz App - The Nigerian Constitution";
};

const num_color = (nco) =>
  (document.querySelector(".redi" + que_numb).style.color = nco);
let timeValue = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 550;
let number_Ques = [];
for (i = 1; i < questions.length + 1; i++) {
  number_Ques[i] = "<b class = " + "redi" + i + ">" + i + "</b>";
}

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  timeValue = 20;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  startTimer(timeValue); //calling startTimer function
  startTimerLine(widthValue); //calling startTimerLine function
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
function Nxt() {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
}

// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log(number_Ques[que_numb - 1]);
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
    num_color("green");
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    console.log("Wrong Answer");
    console.log(number_Ques[que_numb - 1]);
    document.querySelector(".redi" + que_numb).style.color = "red";

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  let delay = 3;
  const DelayTimer = setInterval(function () {
    if (delay < 0) {
      clearInterval(DelayTimer);
      Nxt();
      time_line.style.backgroundColor = "#027cff";
    }
    delay--;
  }, 200); //go to the next question if user selected any option
}

let half_score = parseInt((50 / questions.length) * 100);

// result
function showResult() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore == questions.length) {
    // if user scored all
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span> Super Congratulations! <br /> You got <p> 100% </p></span>";
    scoreText.innerHTML = scoreTag;
    scoreText.style.color = "green";
    ansIcon.style.color = "green";
    ansIcon.innerHTML = tickIconTag; //adding new span tag inside score_Text
  } else if (Math.trunc((userScore / questions.length) * 100) > 50) {
    // if user reaches half score
    let scoreTag =
      "<span> Congratulations  You got <p>" +
      Math.trunc((userScore / questions.length) * 100) +
      "% </p></span>";
    scoreText.innerHTML = scoreTag;
    scoreText.style.color = "white";
    ansIcon.innerHTML = tickIconTag;
    ansIcon.style.color = "green";
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span> Oops! You got <p>" +
      Math.trunc((userScore / questions.length) * 100) +
      "% </p></span>";
    scoreText.innerHTML = scoreTag;
    scoreText.style.color = "red";
    ansIcon.innerHTML = crossIconTag;
    ansIcon.style.color = "red";
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    time_line.style.backgroundColor = "#027cff";
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }

    if (time < 10) {
      time_line.style.backgroundColor = "yellow";
    }

    if (time < 5) {
      time_line.style.backgroundColor = "red";
    }

    if (time < 0) {
      //if timer is less than 0
      clearInterval(counter); //clear counter
      time_line.style.backgroundColor = "#027cff";
      timeText.textContent = "Time Off"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
          let delay = 3;
          const DelayTimer = setInterval(function () {
            if (delay < 0) {
              clearInterval(DelayTimer);
              Nxt();
              time_line.style.backgroundColor = "#027cff";
              document.querySelector(".redi" + que_numb - 1).style.color =
                "red";
            }
            delay--;
          }, 200);
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 38);
  function timer() {
    time -= 1; //downgrading time value with 1
    time_line.style.width = time + "px"; //decreasing the width of time_line with px by time value
    if (time < 0) {
      //if time value is less than 0
      clearInterval(counterLine); //clear counterLine
    }
  }
}

function queCounter(index) {
  //creating a

  numb_Q = number_Ques.join(" ");
  // number_Ques[index].style.color = "red";

  // number_Ques[index] =
  bottom_ques_counter.innerHTML = numb_Q;
  const currNumb = (document.querySelector(".redi" + index).style.color =
    "blue");
  // let totalQueCounTag =
  //   "<span><p>" +
  //   index +
  //   "</p> of <p>" +
  //   questions.length +
  //   "</p> Questions</span>";
  // bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
