@echo off
call python -m pip install --user --upgrade twine
call twine upload dist/*
pause