import logging
import sys
from datetime import datetime

from . import Prototypes


class LogManager(Prototypes.Singleton):
    def __init__(self):
        formatter = logging.Formatter('')
        stream_handler = logging.StreamHandler(sys.stdout)
        stream_handler.setFormatter(formatter)
        file_handler = logging.FileHandler('Back.log', 'w', 'utf-8')
        file_handler.setFormatter(formatter)
        self.logger = logging.getLogger('logger')
        self.logger.setLevel(logging.DEBUG)
        if len(self.logger.handlers) == 0:
            self.logger.addHandler(stream_handler)
            self.logger.addHandler(file_handler)

    def debug(self, text):
        self.print('DEBG', text)

    def info(self, text):
        self.print('INFO', text)

    def warn(self, text):
        self.print('WARN', text)

    def error(self, text):
        self.print('ERRO', text)

    def critical(self, text):
        self.print('!!!!', text)

    def print(self, logo, text):
        temp = '[{}]({}){}'
        date = datetime.today()
        text = temp.format(logo, date.strftime("%y%m%d-%H%M%S-%f"), text)
        self.logger.critical(text)


logger = LogManager()
