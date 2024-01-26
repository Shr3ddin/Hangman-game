const wordList = [
	{
		word: 'sunshine',
		hint: 'Source of light and warmth in the sky',
	},

	{
		word: 'adventure',
		hint: 'Exciting and daring experience',
	},

	{
		word: 'elephant',
		hint: 'Largest land mammal',
	},

	{
		word: 'keyboard',
		hint: 'Input device for computers',
	},

	{
		word: 'butterfly',
		hint: 'Colorful insect with wings',
	},

	{
		word: 'galaxy',
		hint: 'Vast system of stars and celestial bodies',
	},

	{
		word: 'symphony',
		hint: 'Musical composition for an orchestra',
	},

	{
		word: 'chocolate',
		hint: 'Source of light and warmth in the sky',
	},
];

const keyboard = document.querySelector('.keyboard');
const keys = keyboard.querySelectorAll('.key');
const hintContent = document.querySelector('.hint-text');
const wordLetters = document.querySelector('.word-letters');
const guesses = document.querySelector('.guesses-text span');
const hangmanImg = document.querySelector('.hangman-img-box img');
const modal = document.querySelector('.result-modal');

let currentWord;
let mistake = 0;
let correctLetters = [];
const maxAttempts = 5;

const getRandomExample = () => {
	const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

	currentWord = word.toUpperCase();

	hintContent.innerHTML = `<p><span>Hint:</span> ${hint}</p>`;

	wordLetters.innerHTML = word
		.split('')
		.map(() => `<p class="letter"></p>`)
		.join('');
};

const gameOver = isWin => {
	setTimeout(() => {
		const modalText = isWin ? `You guessed the word correctly!` : `Correct answer was:`;
		modal.querySelector('h2').textContent = `${isWin ? 'Congrats! You won!' : 'Game Over! You lost!'}`;
		modal.querySelector('p').innerHTML = `${modalText} <span>${currentWord}</span>`;
		modal.classList.add('active');
	}, 200);
};

const startGame = e => {
	const clickedKey = e.target.textContent;

	console.log(currentWord);

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
