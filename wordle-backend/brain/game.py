# TODO
# write this as an pobject that holds current word and dictionary

def evaluate_guess(word, guess):
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

