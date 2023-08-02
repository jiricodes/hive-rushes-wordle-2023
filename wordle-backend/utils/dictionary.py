class InvalidDictionary(Exception):

    def __init__(self, message = "") -> None:
        self.message = message
        super().__init__(self.message)

def validate_dictionary(words):
    for word in words:
        if len(word) != 5 or not word.isalpha():
            raise InvalidDictionary(f"Invalid word {word}")

    set_words = set(words)
    if len(words) != len(set_words):
        raise InvalidDictionary("Contains duplicates")

def load_dictionary(filename):
    words = []
    with open(filename, "r") as f:
        for line in f.readlines():
            words.append(line.strip())
    validate_dictionary(words)
    return words
