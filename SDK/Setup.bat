@echo off
echo Attention!
echo.
echo Before you start building your development environment, make sure you have the correct version of Python installed!
echo.
echo Recommended Python version: 3.9
echo.
echo Methods of confirmation:
echo 1. Open the command line and type "python -V". The python version should be displayed without error;
echo 2. Open the command line and type "pip -V". The pip version should be displayed without error;
echo.
echo Press any key to continue after satisfying the requirement; If not, close the window, install Python, and try again.
pause > nul
cls
echo Installing Python Dependences...
pip install -r Requirements.txt
echo Done!
pause