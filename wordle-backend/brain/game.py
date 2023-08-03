# TODO
# write this as an pobject that holds current word and dictionary
from random import random


def Game():
    def __init__(self, dictionary):
        self.dictionary = dictionary
        self.guess_limit = 6
        self.restart()

    def restart(self):
        self.guess_counter = 0
        self.word = random.choice(self.dictionary)

    def evaluate_guess(self, guess):
        """_summary_"""

        state = ["yellow", "yellow", "yellow", "yellow", "yellow"]
        for index, (w_char, g_char) in enumerate(zip(self.word, guess)):
            if w_char == g_char:
                state[index] = "green"
            else:
                find_index = self.word.find(g_char)
                if find_index == -1:
                    state[index] = "grey"  
                    
        new_word = []
        new_guess = []
        new_indeces = []
        for i, c in  enumerate(self.word):
            if state[i] != "green":
                new_word.append(c)
                if state[i] == "yellow":
                    new_guess.append(guess[i])
                    new_indeces.append(i)
        for guess_i, (c, i) in  enumerate(zip(new_guess, new_indeces)):
            num = new_word.count(c)
            num_g = new_guess[:guess_i+1].count(c)
            if num < num_g:
                state[i] = "grey"
        return state

