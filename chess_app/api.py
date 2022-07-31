import chess

from django.http import JsonResponse


def move(request):
    """Move a piece on the board."""
    board = chess.Board()
    board.push_san(request.GET["move"])
    return JsonResponse({"fen": "board.fen()"})
