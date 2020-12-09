@echo off
chcp 65001 >nul
title 引擎开发环境搭建脚本 Engine development environment setup scripts
echo 注意！
echo Attention!
echo.
echo 本脚本用于引擎开发者搭建引擎开发环境。
echo Before you start building your development environment, make sure you have the correct version of Python installed!
echo.
echo 按任意键以继续……
pause
cls
echo 再次注意！
echo Attention Again!
echo .
echo 如果您的杀毒软件发出任何警报，请允许。
echo If your antivirus software emits any alerts, please allow.
echo .
echo 如果您有任何安全问题，请随时检查源代码。
echo If you have any security concerns, feel free to check the source code.
echo .
echo 若同意，请按任意键以继续；若拒绝，请关闭本窗口。
echo If agreed, press any key to continue; If rejected, close the window.
pause > nul
cls
echo 检查 Python 安装状态……
echo Checking the Python installation status...
ping localhost -n 3 >nul
where python.exe >nul 2>nul
if not %ErrorLevel% == 0 (
    echo.
    echo 未检测到 Python！
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
cls
echo 安装引擎开发环境依赖中……
echo Installing the engine environment dependences...
ping localhost -n 3 >nul
echo.
pip install -r Requirements.txt
ping localhost -n 3 >nul
echo.
echo 创建后端目录链接中……
echo Create a directory link to the backend...
ping localhost -n 3 >nul
echo.
mklink /j "erajs" "..\Engine\Desktop\BackEnd\erajs"
echo.
echo 完成！
echo Done!
ping localhost -n 2 >nul
echo.
echo 按任意键以继续……
pause