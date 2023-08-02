import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from wordle import compare_strings
from wordle import wordle

def test_woods_solos():
    ret = compare_strings("woods", "solos")
    expected = ["grey", "green", "grey", "yellow", "green"]
    assert ret == expected
    
def test_woods_woods():
    ret = compare_strings("woods", "woods")
    expected = ["green", "green", "green", "green", "green"]
    assert ret == expected

def test_aalii_aalii():
    ret = compare_strings("aalii", "aalii")
    expected = ["green", "green", "green", "green", "green"]
    assert ret == expected
    
def test_abaca_aalii():
    ret = compare_strings("abaca", "aalii")
    expected = ["green", "yellow", "grey", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected    

def test_aalii_liars():
    ret = compare_strings("abaca", "liars")
    expected = ["grey", "grey", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected  
    
def test_zymic_zymes():
    ret = compare_strings("zymic", "zymes")
    expected = ["green", "green", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected

def test_xylic_xylyl():
    ret = compare_strings("xylic", "xylyl")
    expected = ["green", "green", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected
    
def test_xylyl_xylyic():
    ret = compare_strings("xylyl", "xylic")
    expected = ["green", "green", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected
    
def test_emcee_emeer():
    ret = compare_strings("emcee", "emeer")
    expected = ["green", "green", "yellow", "green", "grey"]
    print(f"ret = {ret}")
    assert ret == expected