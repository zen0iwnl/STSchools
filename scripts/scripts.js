document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const answers = [];
        const questions = document.querySelectorAll('form article');
        questions.forEach(function (question) {
            const options = question.querySelectorAll('input[type="radio"]');
            let answered = false;
            options.forEach(function (option) {
                if (option.checked) {
                    answers.push(option.value);
                    answered = true;
                }
            });
            if (!answered) {
                answers.push(null);
            }
        });

        checkQuiz(answers);
    });
});

function checkQuiz(answers) {
    const allNull = answers.every(answer => answer === null);

    if (allNull) {
        alert("Lütfen tüm soruları cevaplayın!");
        return; 
    }


    const correctAnswers = [
        "<h1>",
        "<p>",
        "<a>",
        "<img>",
        "<ol>",
        "<form>",
        "<table>, <tr>, <th>, <td>",
        "<video>",
        "<audio>",
        "<!-- Yorum -->"
    ];

    let score = 0;
    let wrongAnswers = [];

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] !== null && answers[i] === correctAnswers[i]) {
            score++;
        } else {
            wrongAnswers.push({
                index: i + 1,
                selected: answers[i],
                correct: correctAnswers[i]
            });
        }
    }

    if (wrongAnswers.length > 0) {
        let wrongMessage = "Yanlış cevaplar: \n";
        wrongAnswers.forEach(function (answer) {
            wrongMessage += `Soru ${answer.index}: Seçilen cevap: ${answer.selected}, Doğru cevap: ${answer.correct} \n`;
        });
        alert(wrongMessage);
    }

    const resultMessage = `Quiz'i tamamladınız. Toplam puanınız: ${score} / ${correctAnswers.length}.`;

    alert(resultMessage);
}
