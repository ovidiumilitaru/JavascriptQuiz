const correctAnswers = ['B', 'A', 'A', 'B'];
const form = document.querySelector('.quiz-form');
const showResult = document.querySelector('.result');
const scoreSpan = document.querySelector('span');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];
    let qAnswers = [];

    // check answers
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score += 25;
            qAnswers[index] = true;
        } else {
            qAnswers[index] = false;
        }
    });
    
    // show result on page
    scrollTo(0, 0);
    showResult.classList.remove('d-none');

    let output = 0;
    const timer = setInterval(() => {
        showResult.querySelector('span').textContent = `${output}%`;
        if (output === score){
            clearInterval(timer);
        } else {
            output++;
        }
    }, 10);

    // show correct and wrong answers
    let control = 0;
    userAnswers.forEach((answer, index) => {
        control = index + 1;
        nr='q' + control;

        let question = document.querySelectorAll(`input[name=${nr}]`);

        if (qAnswers[index] === true) {
            question.forEach((quest) => {
                if (quest.checked) {
                    quest.nextElementSibling.innerHTML += '<span>&nbsp;&nbsp;&nbsp;GREAT! Your answer is correct.</span>';
                } 
            });
        } else {
            question.forEach((quest) => {
                if (quest.checked) {
                    quest.nextElementSibling.innerHTML += '<span>&nbsp;&nbsp;&nbsp;UPS! Your answer is wrong.</span>';
                } 
            });
        }

    });

});

// reset answers
form.addEventListener('reset', (ev) => {
    form.reset();
    
    showResult.classList.add('d-none');

    const restart = form.querySelectorAll('span');
    restart.forEach(s => {
        s.classList.add('d-none');
    });
    scrollTo(0, 0);
});
