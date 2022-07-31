import json
import chess
import chess.engine
from stockfish import Stockfish
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def move_my(request):
    """Move a piece on the board."""
    json_data = json.loads(request.body)
    position = json_data.get("position", "")
    time = float(json_data.get("time", "0.1"))

    depth = int(json_data.get("depth", "20"))
    board = chess.Board(position)
    if board.is_game_over():
        return JsonResponse({"game_over": "1", "winner": board.result()})
    engine = chess.engine.SimpleEngine.popen_uci("/usr/games/stockfish")
    info = engine.analyse(board, chess.engine.Limit(time=time, depth=depth))
    best_move = info["pv"][0]
    board.push(best_move)
    engine.quit()
    # return JsonResponse({"best_move": best_move})
    return JsonResponse({"position": board.fen()})

