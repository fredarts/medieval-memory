document.addEventListener('DOMContentLoaded', () => {

	//opções de cartas

	const cardArray = [
		{
			name: 'espada',
			img: 'assets/images/espada.jpg'
		},
		{
			name: 'espada',
			img: 'assets/images/espada.jpg'
		},
		{
			name: 'besta',
			img: 'assets/images/besta.jpg'
		},
		{
			name: 'besta',
			img: 'assets/images/besta.jpg'
		},
		{
			name: 'bau',
			img: 'assets/images/bau.jpg'
		},
		{
			name: 'bau',
			img: 'assets/images/bau.jpg'
		},
		{
			name: 'elmo',
			img: 'assets/images/elmo.jpg'
		},
		{
			name: 'elmo',
			img: 'assets/images/elmo.jpg'
		},
		{
			name: 'botas',
			img: 'assets/images/botas.jpg'
		},
		{
			name: 'botas',
			img: 'assets/images/botas.jpg'
		},
		{
			name: 'machado',
			img: 'assets/images/machado.jpg'
		},
		{
			name: 'machado',
			img: 'assets/images/machado.jpg'
		}
	];

	cardArray.sort(() => 0.5 - Math.random());

	let resultDisplay = document.querySelector('#result');

	let musicBtn = document.getElementsByClassName('music-btn')[0];
	musicBtn.addEventListener('click', toggleBackgroundMusic);
	let musicBtnImg = musicBtn.firstElementChild;

	let cardsChosen = [];
	let cardsWon = [];

	let audio = new Audio('assets/audio/selectCard.mp3');
	let backgroundMusic = new Audio('assets/audio/background.mp3');
	let matchSound = new Audio('assets/audio/match.mp3');
	let failSound = new Audio('assets/audio/fail.mp3');

	function startGameButton(){
		let startBtn = document.createElement('button');
		let startBtnImg = document.createElement('img');
		startBtn.classList.add('z-index');
		startBtnImg.setAttribute('src', 'assets/images/startGame.png');
		startBtn.addEventListener('click',createBoard, false);
		startBtn.appendChild(startBtnImg);
		document.body.appendChild(startBtn);
	}

	function playBackgroundMusic(){
		backgroundMusic.volume = 0.20;
		backgroundMusic.play();
	}

	function toggleBackgroundMusic(){
		if (backgroundMusic.volume == 0) {
			backgroundMusic.volume = 0.20;
			musicBtnImg.setAttribute('src', 'assets/images/musicOn.png');
		}
		else {
			backgroundMusic.volume = 0;
			musicBtnImg.setAttribute('src', 'assets/images/musicOff.png');
		}
	}

	function showImage(src, width, height, timeout) {
		let imgo = document.createElement('img');
		imgo.src = src;
		imgo.width = width;
		imgo.height = height;
		imgo.id = 'matchId';

		document.body.appendChild(imgo);
		setTimeout(() => document.getElementById('matchId').remove(), timeout);
	}

	function createBoard() {
		playBackgroundMusic();
		let scoreBar = document.getElementsByClassName('score-bar')[0];
		scoreBar.removeAttribute('hidden');
		musicBtn.removeAttribute('hidden');
		let grid = document.getElementsByClassName('grid')[0];
		grid.style.display = 'flex';
		let btn = document.getElementsByClassName('z-index')[0];
  	btn.parentNode.removeChild(btn);
		generateCards(grid);
	}

	function generateCards(parent) {
		for (let i = 0; i < cardArray.length; i++) {
			const card = document.createElement('div');
			card.classList.add('card');
			card.setAttribute('data-id', i);
			card.addEventListener('click', flipCard);

			const cardFront = document.createElement('div');
			cardFront.classList.add('card__face', 'card__face--front');
			const img = document.createElement('img');
			img.setAttribute('src', cardArray[i].img);
			cardFront.appendChild(img);

			const cardBack = document.createElement('div');
			cardBack.classList.add('card__face', 'card__face--back');
			
			card.appendChild(cardFront);
			card.appendChild(cardBack);
			parent.appendChild(card);
		}
	}

	function checkForMatch(){
		var cards = document.querySelectorAll('.grid .card');
		const optionOneId = cardsChosen[0].id;
		const optionTwoId = cardsChosen[1].id;
		if (cardsChosen[0].name === cardsChosen[1].name) {
			setTimeout(() => {
				matchSound.play();
				showImage('assets/images/match.png', 280, 86, 2000);
				disableCard(cards[optionOneId]);
				disableCard(cards[optionTwoId]);
				cardsWon.push(cardsChosen);
			}, 400);
		} else {
			setTimeout(() => {			
				failSound.play();
				toggleIsFlipped(cards[optionOneId]);
				toggleIsFlipped(cards[optionTwoId]);
				showImage('assets/images/fail.png', 200, 86, 500);
			}, 400);
		}

		cardsChosen = [];
		cardsChosenId = [];	
		resultDisplay.innerHTML = cardsWon.length;
			
		if (cardsWon.length === cardArray.length/2) {
			showImage('assets/images/congratulations.png', 527, 86);
		}
	}

	function flipCard(){
		const cardId = this.getAttribute('data-id');
		const card = { ...cardArray[cardId], id: cardId };
		if (!cardsChosen.some(c => c.id === cardId)) {
			toggleIsFlipped(this);
			cardsChosen.push(card);
		};
		audio.play();
		if (cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500);
		}
	}

	function toggleIsFlipped(card) {
		card.classList.toggle('is-flipped');
	}

	function disableCard(card) {
		card.lastElementChild.classList.remove('card__face--back');
		card.lastElementChild.classList.add('card__face--matched');
		card.removeEventListener('click', flipCard);
		toggleIsFlipped(card);
	}

	startGameButton();
});
