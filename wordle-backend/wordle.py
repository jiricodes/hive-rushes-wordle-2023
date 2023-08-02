# main app to initiate the wordle
# should take the dictionary as an argument
import sys
import random
#from colorama import Fore, Style

#        print(f"\033[92m{word}\033[00m") green
#        print(f"\033[93m{word}\033[00m") yellow
#        print(f"\033[90m{word}\033[00m") grey

def compare_strings(word, guess):
    """_summary_"""

    state = ["yellow", "yellow", "yellow", "yellow", "yellow"]
    for index, (w_char, g_char) in enumerate(zip(word, guess)):
        if w_char == g_char:
            state[index] = "green"
        else:
            find_index = word.find(g_char)
            if find_index == -1:
                state[index] = "grey"  
                
    new_word = []
    new_guess = []
    new_indeces = []
    for i, c in  enumerate(word):
        if state[i] != "green":
            new_word.append(c)
            if state[i] == "yellow":
                new_guess.append(guess[i])
                new_indeces.append(i)
    for guess_i, (c, i) in  enumerate(zip(new_guess, new_indeces)):
        num = new_word.count(c)
        num_g = new_guess[:guess_i+1].count(c)
        print(num)
        print(num_g)
        if num < num_g:
            state[i] = "grey"
    return state

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

    
def main(filename):
    """_summary_"""
    with open(filename, 'r', encoding='ascii') as file:
        dictionary = []
        dictionary = file.readlines()
    dictionary = [line.replace('\n', '') for line in dictionary]
    word = "woods" #random.choice(dictionary)
    print(word)
    wordle(word, dictionary)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("One required argument: dictionary file")
    main(sys.argv[1])
