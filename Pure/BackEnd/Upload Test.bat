@echo off
echo Installing BackEnd Dependency...
call twine upload --repository-url https://test.pypi.org/legacy/ dist/*
echo Done!
pause