import sys

if len(sys.argv) < 2:
    print("missing dict argument")
    exit

f = open(sys.argv[1], "r")
for line in f.readlines():
    line = line.strip()
    if len(line) != 5 or not line.isalpha():
        print(f"error at {line}")
        exit
