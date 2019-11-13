@echo off
chcp 65001
set DEBUG=electron-builder
call npx electron-builder --dir
echo 检测是否为amd64架构
ren "dist\win-unpacked\era-js.exe" "Era.js.exe"
echo 检测是否为i386架构
ren "dist\win-ia32-unpacked\era-js.exe" "Era.js.exe"
pause