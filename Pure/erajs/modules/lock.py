import time


class LockModule:
    # lock 机制：
    # __lock_status 是指示当前 lock 状态的变量；
    # 0：无锁，可锁（默认）；1：有锁，可解锁；-1：无锁，不可锁；
    #  0：_unlock()        ：与 RENDERER 握手完成，鼠标左键，b；
    #  1：_lock()          ：开始游戏脚本前，p.wait；
    # -1：_unlock_forever()：鼠标右键；
    __lock_status = [0, 'mouse']

    def __init__(self) -> None:
        super().__init__()

    def wait_for_unlock(self) -> None:
        # print('wait_for_unlock')
        while self.is_locked():
            time.sleep(0.1)

    def is_locked(self) -> None:
        # print('is_locked')
        if self.__lock_status[0] == 1:
            return True
        else:
            return False

    def lock_passed(self) -> None:
        # print('lock_passed')
        if self.__lock_status[0] == -1:
            return True
        else:
            return False

    def lock(self) -> None:
        # print('lock')
        self.__lock_status[0] = 1

    def unlock(self) -> None:
        # print('unlock')
        self.__lock_status[0] = 0

    def unlock_forever(self) -> None:
        # print('unlock_forever')
        self.__lock_status[0] = -1
