import sys

if len(sys.argv) < 2:
    print("missing dict argument")
    exit(1)

with open(sys.argv[1], "r") as f:
    for line in f.readlines():
        line = line.strip()
        if len(line) != 5 or not line.isalpha():
            print(f"error at {line}")
            exit(1)
with open(sys.argv[1], "r") as f:
    words = f.readlines();
    set_words = set(words);
    print(f"words == set: {len(words) == len(set_words)}")
