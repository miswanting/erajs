@echo off
REM start server.bat
REM start client.bat
title Server
python Game.py
pydoc -w engine.game
pydoc -w src.lib_base
pydoc -w src.lib_era
move *.html docs
pause