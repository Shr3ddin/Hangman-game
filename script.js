// const wordList = [
// 	{
// 		word: 'sunshine',
// 		hint: 'Source of light and warmth in the sky',
// 	},

// 	{
// 		word: 'adventure',
// 		hint: 'Exciting and daring experience',
// 	},

// 	{
// 		word: 'elephant',
// 		hint: 'Largest land mammal',
// 	},

// 	{
// 		word: 'keyboard',
// 		hint: 'Input device for computers',
// 	},

// 	{
// 		word: 'butterfly',
// 		hint: 'Colorful insect with wings',
// 	},

// 	{
// 		word: 'galaxy',
// 		hint: 'Vast system of stars and celestial bodies',
// 	},

// 	{
// 		word: 'symphony',
// 		hint: 'Musical composition for an orchestra',
// 	},

// 	{
// 		word: 'chocolate',
// 		hint: 'A sweet treat made from cocoa beans',
// 	},
// 	{
// 		word: 'computer',
// 		hint: 'Electronic device for processing data',
// 	},
// 	{
// 		word: 'ocean',
// 		hint: 'A vast body of water surrounding continents',
// 	},
// 	{
// 		word: 'book',
// 		hint: 'A collection of printed or written pages, often bound',
// 	},
// 	{
// 		word: 'mountains',
// 		hint: 'High, natural terrain formations',
// 	},
// 	{
// 		word: 'bicycle',
// 		hint: 'A two-wheeled vehicle powered by muscle force',
// 	},
// 	{
// 		word: 'flower',
// 		hint: 'The reproductive part of a plant, often colorful and fragrant',
// 	},
// 	{
// 		word: 'cat',
// 		hint: 'A domestic predator, a popular pet',
// 	},
// 	{
// 		word: 'car',
// 		hint: 'A mechanical vehicle used for transportation',
// 	},
// 	{
// 		word: 'phone',
// 		hint: 'An electronic device for remote communication',
// 	},
// 	{
// 		word: 'star',
// 		hint: 'A luminous celestial body, mainly composed of hydrogen and helium',
// 	},
// ];

// polish version for tests

const wordList = [
	{
		word: 'slonce',
		hint: 'Źródło światła i ciepła na niebie',
	},

	{
		word: 'przygoda',
		hint: 'Ekscytujące i śmiałe doświadczenie',
	},

	{
		word: 'slon',
		hint: 'Największy lądowy ssak',
	},

	{
		word: 'klawiatura',
		hint: 'Urządzenie wejściowe do komputerów',
	},

	{
		word: 'motyl',
		hint: 'Kolorowy owad z skrzydłami',
	},

	{
		word: 'galaktyka',
		hint: 'Ogromny system gwiazd i ciał niebieskich',
	},

	{
		word: 'symfonia',
		hint: 'Kompozycja muzyczna dla orkiestry',
	},

	{
		word: 'czekolada',
		hint: 'Słodycz wytwarzana z ziaren kakaowca',
	},
	{
		word: 'komputer',
		hint: 'Elektroniczne urządzenie do przetwarzania danych',
	},
	{
		word: 'ocean',
		hint: 'Ogromna masa wodna otaczająca kontynenty',
	},
	{
		word: 'ksiazka',
		hint: 'Zbiór drukowanych lub pisanych stron, często oprawionych',
	},
	{
		word: 'gory',
		hint: 'Wysokie, naturalne formacje terenu',
	},
	{
		word: 'rower',
		hint: 'Pojazd na dwóch kołach napędzany siłą mięśni',
	},
	{
		word: 'kwiat',
		hint: 'Reprodukcyjna część rośliny, często kolorowa i pachnąca',
	},
	{
		word: 'kot',
		hint: 'Domowy drapieżnik, popularne zwierzę domowe',
	},
	{
		word: 'samochod',
		hint: 'Pojazd mechaniczny używany do transportu',
	},
	{
		word: 'telefon',
		hint: 'Urządzenie elektroniczne do komunikacji na odległość',
	},
	{
		word: 'gwiazda',
		hint: 'Świecące ciało niebieskie, głównie złożone z wodoru i helu',
	},
];

const keyboard = document.querySelector('.keyboard');
const keys = keyboard.querySelectorAll('.key');
const hintContent = document.querySelector('.hint-text');
const wordLetters = document.querySelector('.word-letters');
const guesses = document.querySelector('.guesses-text span');
const hangmanImg = document.querySelector('.hangman-img-box img');
const modal = document.querySelector('.result-modal');
const playAgainBtn = document.querySelector('.play-again-btn');

let currentWord, mistake, correctLetters;
const maxAttempts = 6;

const playAgain = () => {
	mistake = 0;
	correctLetters = [];
	hangmanImg.src = `./img/hangman-${mistake}.svg`;
	guesses.textContent = `${mistake} / ${maxAttempts}`;

	keys.forEach(key => {
		key.disabled = false;
	});

	wordLetters.innerHTML = currentWord
		.split('')
		.map(() => `<p class="letter"></p>`)
		.join('');
	modal.classList.remove('active');
};

const getRandomExample = () => {
	const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

	currentWord = word.toUpperCase();

	hintContent.innerHTML = `<p><span>Hint:</span> ${hint}</p>`;

	playAgain();
};

const gameOver = isWin => {
	setTimeout(() => {
		const modalText = isWin ? `You guessed the word correctly!` : `Correct answer was:`;
		modal.querySelector('h2').textContent = `${isWin ? 'Congrats! You won!' : 'Game Over! You lost!'}`;
		modal.querySelector('p').innerHTML = `${modalText} <span>${currentWord}</span>`;
		modal.classList.add('active');
	}, 400);
};

const startGame = e => {
	const clickedKey = e.target.textContent;

	if (currentWord.includes(clickedKey)) {
		[...currentWord].forEach((letter, index) => {
			if (letter === clickedKey) {
				correctLetters.push(letter);
				wordLetters.querySelectorAll('p')[index].textContent = letter;
				wordLetters.querySelectorAll('p')[index].classList.add('guessed');
			}
		});
	} else {
		mistake++;
		hangmanImg.src = `./img/hangman-${mistake}.svg`;
	}

	e.target.disabled = 'true';
	guesses.textContent = `${mistake} / ${maxAttempts}`;

	if (maxAttempts === mistake) return gameOver(false);
	if (correctLetters.length === currentWord.length) return gameOver(true);
};

keys.forEach(key => {
	key.addEventListener('click', startGame);
});

getRandomExample();
playAgainBtn.addEventListener('click', getRandomExample);
