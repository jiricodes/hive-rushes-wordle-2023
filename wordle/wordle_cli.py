# main app to initiate the wordle
# should take the dictionary as an argument
import sys
import random


from utils.dictionary import load_dictionary
from brain.game import WordleGame

def print_guess(guess, body, word):
    sys.stdout.write("\x1b[1A")
    sys.stdout.write("\x1b[2K")

    if body["stage"] == "win":
        sys.stdout.write("\x1b[1A")
        sys.stdout.write("\x1b[2K")
        print(f"\033[92m{guess}\033[00m")
        return
    if body["stage"] == "loss":
        sys.stdout.write("\x1b[1A")
        sys.stdout.write("\x1b[2K")
    else:
        for index, c in enumerate(guess):
            if body["state"][index] == "green":
                print(f"\033[92m{c}\033[00m", end="")
            elif body["state"][index] == "yellow":
                print(f"\033[93m{c}\033[00m", end="") 
            elif body["state"][index] == "grey":
                print(f"\033[90m{c}\033[00m",end="")
    print("", flush=True)

def print_logo():
    print("\033[91m" + r""" _  _  ____                                  _ _      """)
    print("\033[92m" + r"""| || ||___ \          __      _____  _ __ __| | | ___ """)
    print("\033[93m" + r"""| || |_ __) |  _____  \ \ /\ / / _ \| '__/ _` | |/ _ \ """)
    print("\033[94m" + r"""|__   _/ __/  |_____|  \ V  V / (_) | | | (_| | |  __/""")
    print("\033[95m" + r"""   |_||_____|           \_/\_/ \___/|_|  \__,_|_|\___|""" + "\033[00m")
    print("")
    print("")

def main(filename):
    wordle_game = WordleGame(filename)

    print_logo()
    while True:
        word = wordle_game.g_word
        guess = input()
        guess = guess.lower() 
        body = wordle_game.guess_round(guess)
        if body["valid"] is False:
            print("\033[1;31;40mInvalid guess. Please enter a valid word.\033[00m")
        else:
            print_guess(guess, body, word)
        if body["stage"] == "win":
            if body['guess_counter'] == 1:
            	print(f"\033[92mCorrect! You guessed it in {body['guess_counter']} guess\033[00m")
            else:
                print(f"\033[92mCorrect! You guessed it in {body['guess_counter']} guesses\033[00m")
            break
        elif body["stage"] == "loss":
            print(f"\033[1;31;40mThe word was '{word}'.\033[00m")
            break

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("One required argument: dictionary file")
    else:
        main(sys.argv[1])
