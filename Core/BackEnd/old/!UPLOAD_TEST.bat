@echo off
call python -m pip install --user --upgrade twine
call twine upload --repository-url https://test.pypi.org/legacy/ dist/*
pause