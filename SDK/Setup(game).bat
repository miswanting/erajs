@echo off
chcp 65001 >nul
title 游戏开发环境搭建脚本 Game development environment setup scripts
echo 注意！
echo Attention!
echo.
echo 本脚本用于游戏开发者搭建游戏开发环境。
echo This script is used by the game developer to setup the game development environment.
echo.
echo 按任意键以继续……
pause
cls
echo 检查 Python 安装状态……
echo Checking the Python installation status...
ping localhost -n 3 >nul
where python.exe >nul 2>nul
if not %ErrorLevel% == 0 (
    echo.
    echo 未检测到Python！
    echo Python is not detected!
    echo.
    echo 请在安装 Python 3.8+ 后重新启动本脚本！
    echo Please restart this script after installing Python 3.8+!
    echo.
    echo 你可以通过在命令行中运行“python -V”来检查 Python 是否已正确安装！
    echo You can check if Python is installed correctly by running "python -V" on the command line!
    echo.
    echo 记得不要忘记将 python 加入到 PATH 环境变量中！
    echo Don't forget to add python to the PATH environment variable!
    pause
    exit
)
echo.
echo Python 已安装！
echo Python is installed!
echo.
echo 检查 Pip 安装状态……
echo Checking the Pip installation status...
ping localhost -n 3 >nul
where pip.exe >nul 2>nul
if not %ErrorLevel% == 0 (
    echo.
    echo 未检测到 Pip！
    echo Pip is not detected!
    echo.
    echo 请在正确安装 Pip 后重新启动本脚本！
    echo Please restart this script after installing Pip!
    echo.
    echo 你可以通过在命令行中运行“pip -V”来检查 Pip 是否已正确安装！
    echo You can check if Pip is installed correctly by running "pip -V" on the command line!
    echo.
    echo 记得不要忘记将 pip 加入到 PATH 环境变量中！
    echo Don't forget to add pip to the PATH environment variable!
    pause
    exit
)
echo.
echo Pip 已安装！
echo Pip is installed!
ping localhost -n 3 >nul
echo 1. Open the command line and type "python -V". The python version should be displayed without error;
echo 2. Open the command line and type "pip -V". The pip version should be displayed without error;
cls
echo 安装游戏开发环境依赖中……
echo Installing the game environment dependences...
ping localhost -n 3 >nul
echo.
pip install -r Requirements.txt
echo.
echo 完成！
echo Done!
ping localhost -n 2 >nul
echo.
echo 按任意键以继续……
pause