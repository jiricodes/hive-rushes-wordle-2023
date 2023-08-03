import sys
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from brain.game import WordleGame 
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1)
CORS(app)

wordle_game: WordleGame

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/api/v1/guess", methods=["POST"])
def compare_strings():
    """_summary_"""
    guess = request.get_json()["guess"]
    print(guess)
    body = wordle_game.guess_round(guess)
    return jsonify(body)

@app.route('/api/v1/start')
def start():
    wordle_game.restart_game()
    return jsonify(success=True)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("One required argument: dictionary file")
    else:
        wordle_game = WordleGame(sys.argv[1])
        print(len(wordle_game.g_dictionary))
        app.run("localhost", 6969)

