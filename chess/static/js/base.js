let position = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
let whiteStrength = 1000;
let blackStrength = 1000;
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
		whiteStrength = val;
		document.getElementById('whiteEngineLabel').innerHTML = 'White ELO: ' + val;
	} else {
		blackStrength = val;
		document.getElementById('blackEngineLabel').innerHTML = 'Black ELO: ' + val;
	}
}

function startGame() {
	console.log('Current position as a FEN string:');
	position = board1.fen();
	let data = {
		position: position,
		whiteElo: whiteStrength,
		blackElo: blackStrength
	};
	console.log(data);

	board1 = ChessBoard('board1', { draggable: true, position: position });
}

function editGame() {
	position = board1.fen();
	board1 = ChessBoard('board1', {
		draggable: true,
		dropOffBoard: 'trash',
		position: position,
		sparePieces: true
	});
	location.reload();
}

$('#statrBTN').on('click', startGame);
$('#editBTN').on('click', editGame);
