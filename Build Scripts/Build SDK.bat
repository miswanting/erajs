@echo off
rd /S /Q dist
cd ..\Engine\Desktop\FrontEnd
start npm run build
cd ..\..\..
md dist\Era.js-SDK\runtime
xcopy Engine\Desktop\BackEnd\erajs dist\Era.js-SDK\erajs\ /E
pause
xcopy Engine\Desktop\FrontEnd\dist\win-unpacked dist\Era.js-SDK\runtime\ /E
xcopy SDK dist\Era.js-SDK\ /E /Y
xcopy Engine\Desktop\FrontEnd\src\workers dist\Era.js-SDK\src\workers\ /E
pause