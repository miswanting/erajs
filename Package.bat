@echo off

start .\node_modules\.bin\electron-packager --overwrite .
python setup.py build

ping -n 10 localhost > nul

mkdir .\build\Era.js

xcopy .\era.js-win32-x64\* .\build\Era.js\ /e /y
xcopy .\build\exe.win-amd64-3.6\* .\build\Era.js\ /e /y

rmdir /s /q .\era.js-win32-x64
rmdir /s /q .\build\exe.win-amd64-3.6

pause