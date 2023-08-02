import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from wordle import compare_strings

def test_woods_solos():
    ret = compare_strings("woods", "solos")
    expected = ["grey", "green", "grey", "yellow", "green"]
    assert ret == expected
