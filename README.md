# hive-rushes-wordle-2023
A 48 hours coding challenge under 42 curriculum.

## Requirements
The project has been developed using Python 3.9.2

The usage of virtual environment is highly suggested

Install requirements using `pip install -r requirements.txt`
or manually:
 - flask
 - flask-cors
 - pytest

## post command
`curl -X POST localhost:6969/guess -H 'Content-Type: application/json' -d '{"guess": "solos"}'`
