@echo off
cd /d %~dp0
cd ..
mklink /d era-js\src\span-charm-react ..\..\span-charm-react\src
pause