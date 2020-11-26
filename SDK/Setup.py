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
                'Debug.bat',
                'Erajs.log',
                'Front.bat',
                'LICENSE',
                'Package.bat',
                'requirements.txt',
                'Setup.bat',
                'setup.py'
            ]:
                continue
            build_exe_options['include_files'].append(
                os.path.join(dirpath, each)
            )
        for each in dirnames:
            if each in ['.git', 'build', 'cache', 'prebuilt', 'save']:
                continue
            build_exe_options['include_files'].append(
                os.path.join(dirpath, each)+'/'
            )
for dirpath, dirnames, filenames in os.walk('prebuilt'):
    if dirpath == 'prebuilt':
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
setup(
    name="Era.js",
    version="0.1.0",
    description="Era.js Game Script",
    options={"build_exe": build_exe_options},
    executables=[Executable("Launcher.py")]
)
