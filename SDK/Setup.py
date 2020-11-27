import shutil
import sys
import os
from cx_Freeze import Executable, setup

# Dependencies are automatically detected, but it might need fine tuning.
build_exe_options = {
    "packages": ["os", "json", "yaml", "semver"],
    "include_files": [],
    "excludes": ["tkinter"]
}
for dirpath, dirnames, filenames in os.walk('.'):
    if dirpath == '.':
        for each in filenames:
            if each in [
                '.gitignore',
                'Erajs.log',
                'Package.bat',
                'Requirements.txt',
                'RunBackEnd.bat',
                'RunFrontEnd.bat',
                'Setup.bat',
                'setup.py',
                'Setup(dev).bat'
            ]:
                continue
            build_exe_options['include_files'].append(
                os.path.join(dirpath, each)
            )
        for each in dirnames:
            if each in ['.git', 'build', 'save']:
                continue
            build_exe_options['include_files'].append(
                os.path.join(dirpath, each)+'/'
            )
for dirpath, dirnames, filenames in os.walk('runtime'):
    if dirpath == 'runtime':
        for each in filenames:
            if each in ['README.md', 'prebuilt.zip']:
                continue
            build_exe_options['include_files'].append(
                os.path.join(dirpath, each)
            )
        for each in dirnames:
            build_exe_options['include_files'].append(
                os.path.join(dirpath, each)+'/'
            )
base = None
if sys.platform == "win32":
    base = "Win32GUI"

setup(
    name="Era.js",
    version="0.1.0",
    description="Era.js Game Script",
    options={"build_exe": build_exe_options},
    executables=[Executable("Launcher.py", base=base)]
)
