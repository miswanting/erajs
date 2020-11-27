@echo off
rd /S /Q dist
cd ..\Engine\Desktop\FrontEnd
call npm run setup
call npm run build
cd ..\..\..
md dist\Era.js-SDK\runtime
xcopy Engine\Desktop\BackEnd\erajs dist\Era.js-SDK\erajs\ /E /Y
xcopy Engine\Desktop\FrontEnd\dist\win-unpacked dist\Era.js-SDK\runtime\ /E /Y
xcopy SDK dist\Era.js-SDK\ /E /Y
xcopy Engine\Desktop\FrontEnd\src\workers dist\Era.js-SDK\src\workers\ /E /Y
pause