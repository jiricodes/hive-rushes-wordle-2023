from error import InvalidDictionary

def validate_dictionary(words):
    set_words = set(words)
    if len(words) != len(set_words):
        raise InvalidDictionary
    pass

def load_dictionary(filename):
with open(sys.argv[1], "r") as f:
    for line in f.readlines():
        line = line.strip()
        if len(line) != 5 or not line.isalpha():
            print(f"error at {line}")
            exit(1)
