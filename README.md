# hive-rushes-wordle-2023
A 48 hours coding challenge under 42 curriculum.
Creators: [jiricodes](https://github.com/jiricodes) [jaurasma](https://github.com/Jaurasma) [ShereeMorphett](https://github.com/ShereeMorphett) 

## Requirements
The project has been developed using Python 3.9.2

The usage of virtual environment is highly suggested

Install requirements using `pip install -r requirements.txt`
or manually:
 - flask
 - flask-cors
 - pytest

## How to Play
Clone the repository to your local machine.
Navigate to the project directory.

### Command Line Interface (CLI)

Run the CLI version of the game using the following command:
```
python wordle-backend/wordle_cli.py resources/words.txt
```

Note: The resources/words.txt file contains a dictionary of valid English words, where all the words used and given are strictly 5-letter words from the English language.

You will be prompted to enter your guesses one by one. Each guess must be a 5-letter word.

After each guess, the game will provide feedback using colors:
Correct letter in the correct spot: Turn green
Correct letter in the wrong spot: Turn yellow
Incorrect letter: Turn grey
Keep guessing until you find the word or use all 6 attempts.

## post command
`curl -X POST localhost:6969/api/v1/guess -H 'Content-Type: application/json' -d '{"guess": "solos"}'`
