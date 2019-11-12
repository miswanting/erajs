from . import EventManager, NEngine, LogManager

e = NEngine.Engine()
logger = LogManager.logger
event_type = EventManager.EventType
dispatcher = EventManager.EventDispatcher()


def config(**kw):
    logger.debug(kw)


def init():
    e.init()
    e.event.dispatch(EventManager.EventType.ENGINE_INIT_STARTED)
    is_init_finished = False

    def change_init_status(e):
        nonlocal is_init_finished
        is_init_finished = True
    dispatcher.add_listener(
        event_type.ENGINE_INIT_FINISHED,
        change_init_status,
        one_time=True
    )
    while True:
        if is_init_finished:
            break
    # e.data.check_file_system()
    # logger.info('├─ Loading Engine Configuration...')
    # e.data.load_config(['config/config.ini'])
    # logger.info('├─ Scanning Plugins...')
    # e.data.data['config']['plugin'].update(
    #     e.module.scan_plugin(
    #         e.data.data['config']['plugin']))
    # logger.info('│  └─ {} Plugins Scanned!'.format(
    #     len(e.data.data['config']['plugin'])))
    # logger.info('├─ Loading Plugins...')
    # n,self.module.load_plugin(self.data.data['config']['plugin'])
    # self.log.info('│  └─ {} Plugins Loaded!'.format(
    #     self.module.load_plugin()))
    # logger.info('├─ Connecting Server...')
    # e.net.connect()
    # logger.info('├─ Transfering Configuration to Server...')
    # e.net.send_config()
    # logger.info('├─ Loading Data Files...')
    # 读data文件夹中的数据文件，扫描的同时要将信息发送到前端
    # data = e.data.load_data(e.data.scan('data'), e.net.send)
    # for each in data.keys():
    #     e.data.data[each] = data[each]
    # logger.info('│  └─ Data Files Loaded!')
    # logger.info('├─ Scanning Scripts...')
    # logger.info('│  └─ {} Scripts Scanned!'.format(
    #     e.module.scan_script()))
    # self.log.info('├─ Loading Scripts...')
    # self.log.info('│  └─ {} Scripts Loaded!'.format(
    #     self.module.load_script(self.net.send)))
    # self.log.info('├─ Scanning DLCs...')
    # self.log.info('│  └─ {} DLCs Scanned!'.format(self.module.scan_dlc()))
    # self.log.info('├─ Loading DLCs...')
    # self.log.info('│  └─ {} DLCs Loaded!'.format(self.module.load_dlc()))
    # self.log.info('├─ Scanning MODs...')
    # self.log.info('│  └─ {} MODs Scanned!'.format(self.module.scan_mod()))
    # self.log.info('├─ Loading MODs...')
    # self.log.info('│  └─ {} MODs Loaded!'.format(self.module.load_mod()))
    # logger.info('├─ Transferring Loading Complete Signal...')
    # e.net.send_loaded()
    # logger.info('└─ Initialize Complete!')


def std():
    pass


def data():
    pass


def cache():
    pass


def save():
    pass
