import erajs.api as a  # 虽然在logic包里面，但也可以用这个语句来调用API哟！


def test_page():
    a.page()
    a.h('测试页')
    a.t()
    a.b('返回', a.back)
