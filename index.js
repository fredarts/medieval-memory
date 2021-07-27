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

	]

	cardArray.sort(() => 0.5 - Math.random())

	const grid = document.querySelector('.grid')
	const resultDisplay = document.querySelector('#result')

	var cardsChosen = []

	var cardsChosenId = []

	var cardsWon = []

	var audio = new Audio('selectCard.mp3');

	var background = new Audio('background.mp3');

	var match = new Audio('match.mp3');




	function playBackground(){
		background.volume = 0.20;
		background.play();

	}


	function show_image(src, width, height) {
	    let imgo = document.createElement("img");
	    imgo.src = src;
	    imgo.width = width;
	    imgo.height = height;
	    imgo.classList.add('matchId');

	    // This next line will just add it to the <body> tag
	    document.body.appendChild(imgo);
	    window.setTimeout("document.getElementsByClassName('matchId').style.display='none';", 3000)



	}

	

	function createBoard() {
		for (let i = 0; i < cardArray.length; i++) {
			let card = document.createElement('img')
			card.setAttribute('src', 'images/costas.jpg')
			card.setAttribute('data-id', i)
			card.addEventListener('click', flipCard)
			grid.appendChild(card)
			
		}
	}


	function checkForMatch(){
		var cards = document.querySelectorAll('img')
		const optionOneId = cardsChosenId[0]
		const optionTwoId = cardsChosenId[1]
		if (cardsChosen[0] === cardsChosen[1]) {
			match.play();
			//alert('You Found a Match')
			show_image('images/logo.png', 400, 200)
			cards[optionOneId].setAttribute('src', 'images/vazio.jpg')
			cards[optionTwoId].setAttribute('src', 'images/vazio.jpg')
			cardsWon.push(cardsChosen)

		} else {
			cards[optionOneId].setAttribute('src', 'images/costas.jpg')
			cards[optionTwoId].setAttribute('src', 'images/costas.jpg')
			alert('Sorry, try again!')
		}

		cardsChosen = []
		cardsChosenId = []
		resultDisplay = textContent = cardsWon.length

		if (cardsWon.length === cardArray.length/2) {
			resultDisplay.textContent = 'Congratulations, you found them all'
		}

	}


	function flipCard(){
		var cardId = this.getAttribute('data-id')
		cardsChosen.push(cardArray[cardId].name)
		playBackground()
		cardsChosenId.push(cardId)
		this.setAttribute('src', cardArray[cardId].img)
		audio.play();
		if (cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500)
		}

	}

	createBoard()









})