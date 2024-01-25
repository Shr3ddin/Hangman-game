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

let currentWord;

const getRandomExample = () => {
	const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

	currentWord = word;

	hintContent.innerHTML = `<p><span>Hint:</span> ${hint}</p>`;

	wordLetters.innerHTML = word
		.split('')
		.map(() => `<p class="letter"></p>`)
		.join('');
};

const startGame = e => {
	const clickedKey = e.target.textContent;

	if (currentWord.includes(clickedKey)) {
		console.log(clickedKey, 'exist on the list');
	} else {
		console.log(clickedKey);
	}
};

keys.forEach(key => {
	key.addEventListener('click', startGame);
});

getRandomExample();
