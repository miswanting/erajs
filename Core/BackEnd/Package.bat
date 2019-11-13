@echo off
echo Generating Distribution Archives...
python setup.py sdist bdist_wheel
echo Done!
echo Now you can upload the package to pypi!
pause