@echo off
title Main
chcp 65001
cls
call ./node_modules/.bin/webpack
call ./node_modules/.bin/electron .
pause
