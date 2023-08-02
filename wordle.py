import random
#from colorama import Fore, Style

#        print(f"\033[92m{word}\033[00m") green
#        print(f"\033[93m{word}\033[00m") yellow
#        print(f"\033[90m{word}\033[00m") grey
def compare_strings(word, guess):
    """_summary_"""

    #need to find the word inside the list
    result = True
    state = ["yellow", "yellow", "yellow", "yellow", "yellow"]
    #pass through string and save state, pass and mark grey and green: then second pass decide if yellow or grey if no green or grey
    for index, (w_char, g_char) in enumerate(zip(word, guess)):
        #The zip function is used to combine multiple iterables (e.g., lists, tuples) into a single iterator of tuples.
        #Each tuple contains the elements from the corresponding positions of the input iterables.
        # Check if the current characters x and y are different
        if w_char == g_char:
            state[index] = "green"
        else:
            find_index = word.find(g_char)
            if find_index == -1:
                state[index] = "grey"
    print(state)
    new_word = []
    new_guess = []
    for i, c in  enumerate(word):
        if state[i] != "green":
            new_word.append(c)
            if state[i] == "yellow":
                new_guess.append(guess[i])

    return state


def wordle(word, dictionary):
    """_summary_"""

    count = 0

    while count <= 6:
        increase = True
        guess = input()
        if len(word) != len(guess):
            print("\033[91mYour guess must be 5 characters\033[00m")
            continue
        if guess not in dictionary:
            print(f"\033[91m{guess} is not a valid word\033[00m")
            continue
        if increase is True:
            state = compare_strings(word, guess)
        state_count = state.count("green")
        if state_count == 5:
            print(f"\033[92m{guess}\033[00m")
            print("\033[92mCorrect!\033[00m")
            break
        if increase is True:
            count += 1
        if count > 6:
            print(f"\033[91m The word was: {word}\033[00m")
            break

    
def main():
    """_summary_"""
    with open('words.txt', 'r', encoding='ascii') as file:
        dictionary = []
        dictionary = file.readlines()
    dictionary = [line.replace('\n', '') for line in dictionary]
    word = random.choice(dictionary)
    print(word)
    wordle(word, dictionary)


if __name__ == "__main__":
    main()
