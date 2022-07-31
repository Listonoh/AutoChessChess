function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


let position = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
let whiteStrength = 1000;
let blackStrength = 1000;
let whiteTime = 0.5;
let blackTime = 5;
const configEditable = {
	draggable: true,
	dropOffBoard: 'trash',
	sparePieces: true
};
var configGame = {
	draggable: true,
	position: position
};

var board1 = ChessBoard('board1', configEditable);
$('#clearBtn').on('click', board1.clear);
$('#logBtn').on('click', clickShowPositionBtn);
$('#setStartBtn').on('click', board1.start);

$('#loadFENBtn').on('click', function() {
	board1.position(position);
});

$('#saveFENBtn').on('click', function() {
	position = board1.fen();
});

function clickShowPositionBtn() {
	console.log('Current position as a FEN string:');
	console.log(board1.fen());
}
function updateTextInput(textID, val) {
	if (textID == 'white') {
		whiteStrength = fenval;
		document.getElementById('whiteEngineLabel').innerHTML = 'White ELO: ' + val;
	} else {
		blackStrength = val;
		document.getElementById('blackEngineLabel').innerHTML = 'Black ELO: ' + val;
	}
}
var game_over = false;
var counter = 0;


function startGame() {
	game_over = false;
	gameLoop();
}
function gameLoop(){
	console.log(game_over)
	if (game_over){
		console.log('Game over');
		return;
	}
	// console.log('Current position as a FEN string:');
	const csrftoken = getCookie('csrftoken');
	game_over = false;
	var c = counter % 2 == 0 ? ' w' : ' b';
	var elo = counter % 2 == 0 ? whiteStrength : blackStrength;
	var time = counter % 2 == 0 ? whiteTime : blackTime;
	game_over = false;
	counter++; 
	position = board1.fen() + c;
	let data = {
		position: position,
		Elo: elo,
		time: time,
	};

	console.log(data);
	result = fetch('/api/move_my/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify(data),
	}).then(response => response.json())
	.then(data => {
		console.log(data);
		board1.position(data.position);
		position = data.position;
		// board1 = ChessBoard('board1', { draggable: true, position: position });

		if (!data.game_over) {
			gameLoop();
		}
		// board1 = ChessBoard('board1', { draggable: true, position: position });
	});

		// $.ajax({
		// 	url: 'api/move_my/',
		// 	type: 'POST',
		// 	data: data,
		// 	headers: {'X-CSRFToken': csrftoken},
		// 	success: function(data) {
		// 		if (data.status == "game_over") {
		// 			console.log(data.message);
		// 			window.alert(data.winner);
		// 			game_over = true;
		// 		}
		// 		console.log(data);
		// 		board1.position(data.position);
		// 		document.getElementById('whiteEngineLabel').innerHTML = 'White ELO: ' + data.whiteElo;
		// 		document.getElementById('blackEngineLabel').innerHTML = 'Black ELO: ' + data.blackElo;
		// 	}
	
	
}

function editGame() {
	// position = board1.fen();
	// board1 = ChessBoard('board1', {
	// 	draggable: true,
	// 	dropOffBoard: 'trash',
	// 	position: position,
	// 	sparePieces: true
	// });
	game_over = true;
	console.log(game_over);
	// location.reload();
}

$('#statrBTN').on('click', startGame);
$('#editBTN').on('click', editGame);
