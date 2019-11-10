import sys  # 不能直接使用"import erajs.api as a"来导入了！


def test_page():
    global a  # 因为是热加载，所以这个语句很必要。
    a.page()
    a.h('麻烦的测试页')
    a.t()
    a.b('返回', a.back)


a = sys.argv[0]  # 而是通过这个语句来达到同样的效果
a.data['api']['test_page'] = test_page  # 这个语句会在引擎加载的时候执行，需要用的时候才调用。
