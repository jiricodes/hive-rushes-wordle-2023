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

#from colorama import Fore, Style

#        print(f"\033[92m{word}\033[00m") green
#        print(f"\033[93m{word}\033[00m") yellow
#        print(f"\033[90m{word}\033[00m") grey

@app.route("/guess", methods = ["POST"])
def compare_strings():
    """_summary_"""
    guess = request.get_json()["guess"]
    print(guess)
    word = g_word
    state = evaluate_guess(word, guess)
    return jsonify(valid=True, state=state)

def print_guess(guess, state):
    """_summary_"""
    
    for index, c in enumerate(guess):
        if state[index] == "green":
            print (f"\033[92m{c}\033[00m", end="")
        if state[index] == "yellow":
            print(f"\033[93m{c}\033[00m", end="") 
        if state[index] == "grey":
            print(f"\033[90m{c}\033[00m", end="")
    print("")

def wordle(word, dictionary):
    """_summary_"""

    count = 1

    while count <= 6:
        increase = True
        guess = input()
        if len(word) != len(guess):
            print("\033[91mYour guess must be 5 characters\033[00m")
            continue
        if guess not in dictionary:
            print(f"\033[91m{guess} is not a valid word\033[00m")
            continue
        state = compare_strings(word, guess)
        state_count = state.count("green")
        if state_count == 5:
            print(f"\033[92m{guess}\033[00m")
            print("\033[92mCorrect!\033[00m")
            break
        print_guess(guess, state)
       	count += 1
        if count == 7:
            print(f"\033[91m The word was: {word}\033[00m")
            break

@app.route('/start')
def start():
    word = random.choice(g_dictionary)
    print(word)
    return jsonify(success=True)

def main(filename):
    g_dictionary = load_dictionary(filename)
    print(len(g_dictionary))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("One required argument: dictionary file")
    g_dictionary = load_dictionary(sys.argv[1])
    print(len(g_dictionary))
    app.run("localhost", 6969)
