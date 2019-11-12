@echo off
call python -m pip install --user --upgrade setuptools wheel
call python setup.py sdist bdist_wheel
pause