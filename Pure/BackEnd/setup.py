import setuptools

with open("README.md", "r") as f:
    long_description = f.read()

setuptools.setup(
    name="erajs",
    version="0.1.0-191112",
    author="Miswanting",
    author_email="453542772@qq.com",
    description="The BackEnd of Era.js Game Engine.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/miswanting/Era.js",
    packages=setuptools.find_packages(),
    include_package_data=True,
    package_data={
        '': ['plugin/*.py']
    },
    classifiers=(
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Console',
        'Environment :: MacOS X',
        'Environment :: Web Environment',
        'Environment :: Win32 (MS Windows)',
        'Environment :: X11 Applications',
        'Framework :: Flask',
        'Framework :: Pytest',
        'Intended Audience :: Developers',
        'Intended Audience :: End Users/Desktop',
        'Intended Audience :: End Users/Desktop',
        'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
        'Natural Language :: Chinese (Simplified)',
        'Operating System :: Android',
        'Operating System :: iOS',
        'Operating System :: MacOS',
        'Operating System :: Microsoft :: Windows',
        'Operating System :: Microsoft :: Windows :: Windows 10',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 3 :: Only',
        'Topic :: Database :: Front-Ends',
        'Topic :: Desktop Environment',
        'Topic :: Games/Entertainment',
        'Topic :: Games/Entertainment :: Multi-User Dungeons (MUD)',
        'Topic :: Games/Entertainment :: Simulation',
        'Topic :: Games/Entertainment :: Turn Based Strategy',
        'Topic :: Internet',
        'Topic :: Scientific/Engineering :: Artificial Intelligence',
        'Topic :: Scientific/Engineering :: Artificial Life',
        'Topic :: Scientific/Engineering :: Human Machine Interfaces',
        'Topic :: Scientific/Engineering :: Visualization',
        'Topic :: Software Development :: Code Generators',
        'Topic :: Software Development :: Internationalization',
        'Topic :: Software Development :: Libraries',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Software Development :: Libraries :: pygame',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Software Development :: Localization',
        'Topic :: Software Development :: User Interfaces',
        'Topic :: Software Development :: Widget Sets'
        'Topic :: System :: Logging'
        'Topic :: System :: Networking'
        'Topic :: Text Processing'
        'Typing :: Typed'
    ),
    python_requires='>=3.6',
)
