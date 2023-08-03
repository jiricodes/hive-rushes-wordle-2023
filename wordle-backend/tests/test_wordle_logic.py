import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from brain.game import evaluate_guess
# from brain.game import Game


def test_woods_solos():
    ret = evaluate_guess("woods", "solos")
    expected = ["grey", "green", "grey", "yellow", "green"]
    assert ret == expected
    
def test_woods_woods():
    ret = evaluate_guess("woods", "woods")
    expected = ["green", "green", "green", "green", "green"]
    assert ret == expected

def test_aalii_aalii():
    ret = evaluate_guess("aalii", "aalii")
    expected = ["green", "green", "green", "green", "green"]
    assert ret == expected
    
def test_abaca_aalii():
    ret = evaluate_guess("abaca", "aalii")
    expected = ["green", "yellow", "grey", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected    

def test_aalii_liars():
    ret = evaluate_guess("abaca", "liars")
    expected = ["grey", "grey", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected  
    
def test_zymic_zymes():
    ret = evaluate_guess("zymic", "zymes")
    expected = ["green", "green", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected

def test_xylic_xylyl():
    ret = evaluate_guess("xylic", "xylyl")
    expected = ["green", "green", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected
    
def test_xylyl_xylyic():
    ret = evaluate_guess("xylyl", "xylic")
    expected = ["green", "green", "green", "grey", "grey"]
    print(f"ret = {ret}")
    assert ret == expected
    
def test_emcee_emeer():
    ret = evaluate_guess("emcee", "emeer")
    expected = ["green", "green", "yellow", "green", "grey"]
    print(f"ret = {ret}")
    assert ret == expected

def test_burnt_toast():
    ret = evaluate_guess("burnt", "toast")
    expected = ["grey", "grey", "grey", "grey", "green"]
    assert ret == expected

def test_maxim_mamma():
    ret = evaluate_guess("maxim", "mamma")
    expected = ["green", "green", "yellow", "grey", "grey"]
    assert ret == expected

def test_swift_iiwis():
    ret = evaluate_guess("swift", "iiwis")
    expected = ["yellow", "grey", "yellow", "grey", "yellow"]
    assert ret == expected


