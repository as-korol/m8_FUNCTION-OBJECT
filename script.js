let minValue;
let maxValue;
let answerNumber;
let orderNumber;
let gameRun;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

function numberToWords(number) {
    const singleDigits = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    if (number === 0) {
        return 'ноль';
    }

    if (number < 0) {
        return 'минус ' + numberToWords(Math.abs(number));
    }

    if (number < 10) {
        return singleDigits[number];
    }

    if (number === 10) {
        return 'десять';
    }

    if (number >= 11 && number <= 19) {
        return teens[number - 10];
    }

    if (number >= 20 && number < 100) {
        const tensDigit = Math.floor(number / 10);
        const singleDigit = number % 10;
        if (singleDigit === 0) {
            return tens[tensDigit];
        } else {
            return tens[tensDigit] + ' ' + singleDigits[singleDigit];
        }
    }

    if (number >= 100 && number < 1000) {
        const hundredsDigit = Math.floor(number / 100);
        const remainingNumber = number % 100;
        if (remainingNumber === 0) {
            return hundreds[hundredsDigit];
        } else {
            return hundreds[hundredsDigit] + ' ' + numberToWords(remainingNumber);
        }
    }

    return number.toString();
}
document.getElementById('btnRetry').addEventListener('click', function () {
    orderNumber = 0;
    orderNumberField.innerText = orderNumber;
    document.querySelector('.fisrtValue').value = ''; // очистка значения первого поля ввода
    document.querySelector('.secondValue').value = ''; // очистка значения второго поля ввода
    minValue = 0;
    maxValue = 0;
    answerField.textContent = `Введие 2 числа, сначала нижнию границу, потом верхнюю и нажмить "Начать"`;
})

document.getElementById('btnLess').addEventListener('click', function less() {
    if (gameRun) {
        if (minValue >= maxValue) {
            const phraseRandom = Math.round(Math.random() * 3);
            const answerPhrase = (phraseRandom === 1) ?
                'Давай попробуем другие числа!\n\u{1F914}' :
                'Я сдаюсь..\n\u{1F92F}';
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random() * 3);
            const randomQuest = (phraseRandom === 1) ?
                'Я прожил уже миллионы жизней, мне твое число абсолютно понятно это:' :
                'Элементарно, Ватсон, это:';
                'Смею предположить, что числом будет являться:';

            if (numberToWords(answerNumber).length < 20) {
                answerField.textContent = randomQuest + ' ' + numberToWords(answerNumber);
            } else {
                answerField.innerText = randomQuest + ' ' + answerNumber;
            }

            if (minValue !== maxValue) {
                maxValue = answerNumber;
            }
        }
    }
});

document.getElementById('btnOver').addEventListener('click', function over() {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random() * 3);
            const answerPhrase = (phraseRandom === 1) ?
                'Давай попробуем другие числа!\n\u{1F914}' :
                'Я сдаюсь..\n\u{1F92F}';
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random() * 3);
            const randomQuest = (phraseRandom === 1) ?
                'Я прожил уже миллионы жизней, мне твое число абсолютно понятно это:' :
                'Элементарно, Ватсон, это:';
                'Смею предположить, что числом будет являться:';

            if (numberToWords(answerNumber).length < 20) {
                answerField.textContent = randomQuest + ' ' + numberToWords(answerNumber);
            } else {
                answerField.innerText = randomQuest + ' ' + answerNumber;
            }       
        }
    }
    console.log('btnOver' + minValue + '/' + maxValue);
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const phraseRandom = Math.round(Math.random() * 3);
        const randomQuest = (phraseRandom === 1) ? // Сообщение при успехе не менее чем в трёх вариантах
            `Это было легко \n\u{1F576}` :
            `Easy breezy lemon squeezy \n\u{1F916}`;
            `Го некст \n\u{1F3B2}`;
        answerField.innerText = randomQuest;
        gameRun = false;
    }
})

document.getElementById('btnStart').addEventListener('click', function () {
    minValue = document.querySelector('.fisrtValue').value || -999;
    minValue = (minValue > 999) ? 999 : (minValue < -999) ? -999 : minValue;
    maxValue = document.querySelector('.secondValue').value || 999;
    maxValue = (maxValue > 999) ? 999 : (maxValue < -999) ? -999 : maxValue;
    minValue = parseInt(minValue);
    maxValue = parseInt(maxValue);
    if (minValue >= maxValue) {
        answerField.textContent = `Вы задали числа неправильно, нажмите кнопку "Заново" и введите сначала нижнию границу, а потом верхнию для начала игры`;
    } else {
        orderNumber = 1;
        orderNumberField.innerText = orderNumber;
        answerNumber = Math.floor((minValue + maxValue) / 2);
        answerField.textContent = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
        gameRun = true;
    }
})

