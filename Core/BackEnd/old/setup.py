import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="erajs",
    version="0.1.0.181116.3",
    author="Miswanting",
    author_email="453542772@qq.com",
    description="A game script engine for Era.js.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/miswanting/erajs",
    packages=setuptools.find_packages(),
    include_package_data=True,
    package_data={
        '': ['plugin/*.py']
    },
    classifiers=(
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
        'Natural Language :: Chinese (Simplified)',
        'Operating System :: Microsoft :: Windows :: Windows 10',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 3 :: Only',
        'Topic :: Communications',
        'Topic :: Database',
        'Topic :: Games/Entertainment',
        'Topic :: Scientific/Engineering :: Artificial Intelligence',
        'Topic :: Scientific/Engineering :: Human Machine Interfaces',
        'Topic :: Scientific/Engineering :: Visualization',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Software Development :: Localization',
        'Topic :: Software Development :: User Interfaces',
        'Topic :: Text Processing'
    )
)
