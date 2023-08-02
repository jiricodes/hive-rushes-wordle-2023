class InvalidDictionary(Exception):

    def __init__(self, message) -> None:
        self.message = message
        super().__init__(self.message)

def validate_dictionary(words):
    set_words = set(words)
    if len(words) != len(set_words):
        raise InvalidDictionary
    pass

def load_dictionary(filename):
    with open(filename, "r") as f:
        for line in f.readlines():
            line = line.strip()
            if len(line) != 5 or not line.isalpha():
                print(f"error at {line}")
                exit(1)
