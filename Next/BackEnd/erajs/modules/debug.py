import datetime
import logging
import sys
from typing import Literal, Text

from ..prototypes import singleton


class DebugModule(singleton.Singleton):
    def __init__(self) -> None:
        super().__init__()
        formatter = logging.Formatter('')
        stream_handler = logging.StreamHandler(sys.stdout)
        stream_handler.setFormatter(formatter)
        file_handler = logging.FileHandler('Erajs.log', 'w', 'utf-8')
        file_handler.setFormatter(formatter)
        self.__logger = logging.getLogger('logger')
        self.__logger.setLevel(logging.DEBUG)
        if len(self.__logger.handlers) == 0:
            self.__logger.addHandler(stream_handler)
            self.__logger.addHandler(file_handler)

    def debug(self, text: Text = '') -> None:
        self.__print('DEBG', text)

    def info(self, text: Text = '') -> None:
        self.__print('INFO', text)

    def warn(self, text: Text = '') -> None:
        self.__print('WARN', text)

    def error(self, text: Text = '') -> None:
        self.__print('ERRO', text)

    def critical(self, text: Text = '') -> None:
        self.__print('!!!!', text)

    def __print(
        self,
        logo: Literal[
            'DEBG',
            'INFO',
            'WARN',
            'ERRO',
            '!!!!'] = 'DEBG',
        text: Text = ''
    ) -> None:
        template = '[{}]({}){}'
        date = datetime.datetime.today()
        text = template.format(logo, date.strftime("%y%m%d-%H%M%S-%f"), text)
        self.__logger.debug(text)
