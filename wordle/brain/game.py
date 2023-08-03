import random
from utils.dictionary import load_dictionary

class WordleGame:
    def __init__(self, dictionary_file):
        self.g_dictionary = load_dictionary(dictionary_file)
        self.max_guess = 6
        self.restart_game()

    def restart_game(self):
        self.guess_count = 0
        self.g_word = random.choice(self.g_dictionary)
        print(f"current word: {self.g_word}")
    
    def valid_guess(self, guess):
        return guess in self.g_dictionary
         
    def evaluate_guess(self, guess):
        self.guess_count += 1
        return evaluate_guess(self.g_word, guess)

    def is_win(self, state):
        if all(i == "green" for i in state) and self.guess_count <= self.max_guess:
            return "win"
        elif self.guess_count >= self.max_guess:
            return "loss"
        else:
            return "playing"
    
    def guess_round(self,guess):
        response = {"stage": "playing", "guess_counter": self.guess_count, "max_guess": self.max_guess, "valid": False, "state": ["yellow", "yellow", "yellow", "yellow", "yellow"]}
        response["valid"] = self.valid_guess(guess)    
        if response["valid"] == True:
            response["state"] = self.evaluate_guess(guess)
            response["guess_counter"] = self.guess_count
            response["stage"] = self.is_win(response["state"])
        if response["stage"] != "playing":
            self.restart_game()
        return response

def evaluate_guess(word, guess):
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
        if num < num_g:
            state[i] = "grey"
    return state

if __name__ == "__main__":
    game = WordleGame("resources/words.txt")
