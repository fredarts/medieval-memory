document.addEventListener('DOMContentLoaded', () => {

//opções de cartas

	const cardArray = [
		{
			name: 'espada',
			img: 'images/espada.jpg'
		},
		{
			name: 'espada',
			img: 'images/espada.jpg'
		},
		{
			name: 'besta',
			img: 'images/besta.jpg'
		},
		{
			name: 'besta',
			img: 'images/besta.jpg'
		},
		{
			name: 'bau',
			img: 'images/bau.jpg'
		},
		{
			name: 'bau',
			img: 'images/bau.jpg'
		},
		{
			name: 'elmo',
			img: 'images/elmo.jpg'
		},
		{
			name: 'elmo',
			img: 'images/elmo.jpg'
		},
		{
			name: 'botas',
			img: 'images/botas.jpg'
		},
		{
			name: 'botas',
			img: 'images/botas.jpg'
		},
		{
			name: 'machado',
			img: 'images/machado.jpg'
		},
		{
			name: 'machado',
			img: 'images/machado.jpg'
		}
	];

	cardArray.sort(() => 0.5 - Math.random());

	let resultDisplay = document.querySelector('#result');

	let musicBtn = document.createElement('button');
	let musicBtnImg = document.createElement('img');

	let cardsChosen = [];
	let cardsChosenId = [];
	let cardsWon = [];

	let audio = new Audio('selectCard.mp3');
	let backgroundMusic = new Audio('background.mp3');
	let matchSound = new Audio('match.mp3');
	let failSound = new Audio('fail.mp3');

	function startGameButton(){
		let btn = document.createElement('button');
		let img = document.createElement('img');
		img.setAttribute('src', 'images/startGame.png');
		btn.classList.add('zindex');
		btn.appendChild(img);
		document.body.appendChild(btn);
		btn.addEventListener('click',createBoard, false);
	}

	function initMusicBtn(){
		musicBtnImg.setAttribute('src', 'images/musicOn.png');
		musicBtn.classList.add('musicbtn');
		musicBtn.appendChild(musicBtnImg);
		document.body.appendChild(musicBtn);
		musicBtn.addEventListener('click', toggleBackgroundMusic);
	}

	function playBackground(){
		backgroundMusic.volume = 0.20;
		backgroundMusic.play();
	}

	function toggleBackgroundMusic(){
		if (backgroundMusic.volume == 0) {
			backgroundMusic.volume = 0.20;
			musicBtnImg.setAttribute('src', 'images/musicOn.png');
		}
		else {
			backgroundMusic.volume = 0;
			musicBtnImg.setAttribute('src', 'images/musicOff.png');
		}
	}

	function showImage(src, width, height, timeout) {
		let imgo = document.createElement("img");
		imgo.src = src;
		imgo.width = width;
		imgo.height = height;
		imgo.id = 'matchId';

		// This next line will just add it to the <body> tag
		document.body.appendChild(imgo);
		setTimeout(() => document.getElementById('matchId').remove(), timeout);
	}

	function createBoard() {
		playBackground();
		initMusicBtn();
		let btn = document.getElementsByClassName('zindex')[0];
  	btn.parentNode.removeChild(btn);
  	let grid = document.createElement('div');
		let bg = document.getElementsByClassName('bg')[0];
		grid.classList.add('grid');
		bg.appendChild(grid);
		for (let i = 0; i < cardArray.length; i++) {
			let card = document.createElement('img');
			card.setAttribute('src', 'images/costas.jpg');
			card.setAttribute('data-id', i);
			card.addEventListener('click', flipCard);
			grid.appendChild(card);
		}
	}

	function checkForMatch(){
		var cards = document.querySelectorAll('img');
		const optionOneId = cardsChosenId[0];
		const optionTwoId = cardsChosenId[1];
		if (cardsChosen[0] === cardsChosen[1]) {
			matchSound.play();
			showImage('images/match.png', 280, 86, 2000);
			cards[optionOneId].setAttribute('src', 'images/vazio.jpg');
			cards[optionTwoId].setAttribute('src', 'images/vazio.jpg');
			// setar também algum atributo que impeça o clique nesses cards novamente
			cardsWon.push(cardsChosen);
		} else {
			failSound.play();
			cards[optionOneId].setAttribute('src', 'images/costas.jpg');
			cards[optionTwoId].setAttribute('src', 'images/costas.jpg');
			showImage('images/fail.png', 200, 86, 500);
		}

		cardsChosen = [];
		cardsChosenId = [];	
		resultDisplay.innerHTML = cardsWon.length;

		if (cardsWon.length === cardArray.length/2) {
			resultDisplay.textContent = 'Congratulations, you found them all';
		}

	}

	function flipCard(){
		var cardId = this.getAttribute('data-id');
		cardsChosen.push(cardArray[cardId].name);
		cardsChosenId.push(cardId);
		this.setAttribute('src', cardArray[cardId].img);
		audio.play();
		if (cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500);
		}
	}

	startGameButton();
});
