import prototype.Creature
import random
import hashlib


def get_hash():
    m = hashlib.md5()
    m.update(str(random.random()).encode("utf-8"))
    return m.hexdigest().upper()


def default_character():
    return prototype.Creature.Creature()
