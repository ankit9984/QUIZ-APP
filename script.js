const start_btn = document.querySelector('.start-btn button'); 
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const option_list = document.querySelector('.option_list');
const timerCount = quiz_box.querySelector('.timer .timer_sec');

// if start quiz button clicked
start_btn.onclick =()=>{
    info_box.classList.add('activeinfo');
}

// if exit button clicked
exit_btn.onclick =() =>{
    info_box.classList.remove('activeinfo');
}
 
// if continue button clicked
continue_btn.onclick =() =>{
    info_box.classList.remove('activeinfo');
    quiz_box.classList.add('activeQuiz');
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}

let que_count = 0;
let que_num = 1;
let counter;
let timeValue = 15;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

restart_quiz.onclick =()=>{
    result_box.classList.remove('activeResult');
    quiz_box.classList.add('activeQuiz');
    let que_count = 0;
    let que_num = 1;
    // let counter;
    let timeValue = 15;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    next_btn.style.display = 'none';
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}

// if next button clicked
next_btn.onclick = ()=>{
   if(que_count < questions.length-1){
    que_count++;
    que_num++;
    showQuestions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    next_btn.style.display = 'none';
   }else{
    console.log('questions completed');
    showResultBox();
   }
}
function showQuestions(index){
    const que_text = document.querySelector('.que_text');
    // const option_list = document.querySelector('.option_list');
    let que_tag = `<span>`+ questions[index].num +'.'+ questions[index].question + `</span>`;
    let option_tag = `<div class="option">`+ questions[index].options[0] +`<span></span></div>` +
                    `<div class="option">`+ questions[index].options[1] +`<span></span></div>` +
                    `<div class="option">`+ questions[index].options[2] +`<span></span></div>` +
                    `<div class="option">`+ questions[index].options[3] +`<span></span></div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer){
    clearInterval(counter);
    // startTimer(timeValue);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add('correct');
        console.log('answer is correct');
        answer.insertAdjacentHTML('beforeend',tickIcon);
    }else{
        answer.classList.add('incorrect');
        console.log('answer is wrong');
        answer.insertAdjacentHTML('beforeend',crossIcon);

        // if ansers is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute('class','option correct');
                option_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
            }
        }
    }

    // once user selected disabled all options
   for(let i=0; i < allOptions; i++){
    option_list.children[i].classList.add('disabled');
   }
   next_btn.style.display = 'block';
}

function showResultBox(){
    info_box.classList.remove('activeinfo');
    quiz_box.classList.remove('activeQuiz');
    result_box.classList.add('activeResult');
    const scoreText = result_box.querySelector('.score_text');
    if(userScore > 3){
        let scoreTag = `<span>and congrat! You got  <p>`+ userScore +`</p> out of <p>` + questions.length + `</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
     else if(userScore > 1){
        let scoreTag = `<span>and nice, You got  <p>`+ userScore +`</p> out of <p>` + questions.length + `</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = `<span>and sorry, You got only <p>`+ userScore +`</p> out of <p>` + questions.length + `</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timerCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timerCount.textContent;
            timerCount.textContent = '0' + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timerCount.textContent = '00';

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute('class','option correct');
                    option_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
                }
            }
            for(let i=0; i < allOptions; i++){
                option_list.children[i].classList.add('disabled');
               }
               next_btn.style.display = 'block';
        }
    }
}
// const botton_ques_counter = quiz_box.querySelector('.total_que');
// let totalQuesCountTag = `<span><p>`+ que_count +`</p>of<p>`+ questions.length`</p>Questions</span>`;
// botton_ques_counter.innerHTML = totalQuesCountTag;

function queCounter(index){
    const botton_ques_counter = quiz_box.querySelector('.total_que');
    let totalQuesCountTag = `<span><p>`+ index +`</p>of<p>`+ questions.length +`</p>Questions</span>`;
    botton_ques_counter.innerHTML = totalQuesCountTag;
}

