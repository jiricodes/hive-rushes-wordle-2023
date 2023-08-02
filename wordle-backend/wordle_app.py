# main app to initiate the wordle
# should take the dictionary as an argument
import sys
import random
from utils.dictionary import load_dictionary
from flask import Flask, request, jsonify
from flask_cors import CORS
from brain.game import evaluate_guess 

app = Flask("Wordle")
CORS(app)
# TODO as object
g_dictionary = ["hello"]
g_word = "hello"

@app.route("/guess", methods = ["POST"])
def compare_strings():
    """_summary_"""
    guess = request.get_json()["guess"]
    print(guess)
    word = g_word
    state = evaluate_guess(word, guess)
    return jsonify(valid=True, state=state)

@app.route('/start')
def start():
    word = random.choice(g_dictionary)
    print(word)
    return jsonify(success=True)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("One required argument: dictionary file")
    g_dictionary = load_dictionary(sys.argv[1])
    print(len(g_dictionary))
    app.run("localhost", 6969)
