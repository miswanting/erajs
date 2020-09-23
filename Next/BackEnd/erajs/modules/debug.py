import logging
import sys
from datetime import datetime

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

    # def debug(self, text: str = '') -> None:
    #     self.print('DEBG', text)

    # def info(self, text: str = '') -> None:
    #     self.print('INFO', text)

    # def warn(self, text: str = '') -> None:
    #     self.print('WARN', text)

    # def error(self, text: str = '') -> None:
    #     self.print('ERRO', text)

    # def critical(self, text: str = '') -> None:
    #     self.print('!!!!', text)

    def print(self, logo: str = 'DEBG', text: str = '') -> None:
        temp = '[{}]({}){}'
        date = datetime.today()
        text = temp.format(logo, date.strftime("%y%m%d-%H%M%S-%f"), text)
        self.__logger.debug(text)
