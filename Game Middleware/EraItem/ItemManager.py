import hashlib

def random_hash(string):
    return hashlib.md5(string.encode('utf8')).hexdigest()



class ItemManager():
    def __init__(self):
        '''
        __all_item:存着所有物品key的列表
        '''
        self.__all_item = {}

    @property
    def all_item(self):
        '''
        返回__all_item
        '''
        return self.__all_item
    
    @all_item.setter
    def  all_item(self, value):
        '''
        all_item的写入方法
        '''
        self.__all_item = value

    def add_new_item(self, key, value):
        '''
        key:str，自动hash
        value：值
        增加新物品
        '''
        key = random_hash(key)
        if self.__all_item.get(key):
            raise KeyError('物品的key已存在，无法覆盖')
        else:
            self.__all_item[key] = value

    def revise_item(self, key, value):
        '''
        key:str，自动hash
        value：值
        修改物品
        '''
        key = random_hash(key)
        self.__all_item[key] = value

    def del_item(self, key):
        '''
        key:str，自动hash
        用str删除物品的value
        删除物品
        '''
        key = random_hash(key)
        self.__all_item.pop(key)
    
    def inquiry_item(self, key):
        '''
        key:str，自动hash
        用str查询物品的value
        '''
        key = random_hash(key)
        return self.__all_item[key]

    def item_iterator(self, condition, return_value = None):
        '''
        condition：查询条件
        return_value_key:你要我return的是什么,可以接收一个列表，默认只返回key
        '''
        if  not return_value :
            for key, value in self.__all_item.items():
                if condition(key) :
                    yield key

        elif type(return_value) in [type('str'), type(0)]:
            for key, value in self.__all_item.items():
                if condition(key) :
                    yield value[return_value]

        elif type(return_value) == type(['list']):
            for key, value in self.__all_item.items():
                if condition(key) :
                    yield [value[i] for i in return_value]

    def __iter__(self):
        '''
        可以直接对ItemManager的实例化对象进行for迭代
        '''
        for key in self.__all_item:
            yield key

    def items(self):
        '''
        对对象进行for迭代时可以用 object.items() 方法
        '''
        return self.__all_item.items()

  

if __name__ == '__main__':
    i_m = ItemManager()
    i_m.add_new_item('倚天剑', {'攻击力':100, '价格':4600})
    i_m.add_new_item('屠龙刀', {'攻击力':90, '价格':9600})
    i_m.add_new_item('银月枪', {'攻击力':200, '价格':1400})
    i_m.add_new_item('峨眉刺', {'攻击力':500, '价格':3500})
    i_m.add_new_item('aaa', {'攻击力':160, '价格':6545})
    i_m.add_new_item('bbb', {'攻击力':985, '价格':5454})
    i_m.add_new_item('ccc', {'攻击力':120, '价格':6666})
    i_m.del_item('峨眉刺')
    i_m.revise_item('银月枪', {'攻击力':190, '价格':1500})

    print('倚天剑的详细信息：', i_m.inquiry_item('倚天剑'))
    print('接下来打印所有物品的键key和值value')
    for k,v in i_m.items():
        print(k, ' : ',v)
    print('接下来打印所有 攻击力 >=150物品的键key')
    for i in i_m.item_iterator(lambda a:i_m.all_item[a]['攻击力']>=150):
        print(i)
    print('接下来打印所有 攻击力 >=150物品的 价格')
    for i in i_m.item_iterator(lambda a:i_m.all_item[a]['攻击力']>=150 ,'价格'):
        print(i)    
    print('接下来打印所有 攻击力 >=150物品的 [攻击力, 价格] 的列表')
    for i in i_m.item_iterator(lambda a:i_m.all_item[a]['攻击力']>=150 ,['攻击力', '价格']):
        print(i)
'''
    物品信息用列表一样可以
    i_m.add_new_item('倚天剑', [15,55])
    i_m.add_new_item('屠龙刀', [25,100])
    i_m.add_new_item('银月枪', [10,40])
    i_m.add_new_item('峨眉刺', [30,30])
    for i in i_m.item_iterator(lambda a:i_m.all_item[a][0]>=20):
        print(i)
    for i in i_m.item_iterator(lambda a:i_m.all_item[a][0]>=20 ,1):
        print(i)    
    for i in i_m.item_iterator(lambda a:i_m.all_item[a][0]>=20 ,[0, 1]):
        print(i)
'''



