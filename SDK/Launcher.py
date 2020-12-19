# 第一章 第一节 前言
# 欢迎打开 Era.js-SDK 示例程序源文件！
# 通过阅读本文件，你将学习到关于使用 Era.js 进行富文本游戏开发的一切！
# 本文件的文件名称为 `Launcher.py`，是游戏代码的总入口，本文件的第一行代码就是整个游戏的第一行代码。
# 那么本文件的第一行代码在哪里呢？是在第1行的名为“前言”（↖）的那家伙吗？
# 并不是。从本文件的第1行到第8行，都被称为`注释`，都以`#`号为一行开头。注释会被程序忽略掉，所以我无论在这里说什么都不会影响到程序的运行~
# 参见：[注释](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#comments)
# 另外，还有一件事情需要你提前知晓，整个教程都是真实的可以被运行起来的代码，推荐一边阅读源代码，一边打开程序进行对照。
# 你看见根目录的`Front.bat`文件了吗？双击打开，引擎的前端就会被启动，
# 然后再双击打开根目录下的`Debug.bat`代码就会运行起来啦！
# 如果你在学习的过程中需要重启游戏，那么在一般情况下，你只需要重启游戏后端。
# 这个方法可以节省你的时间哦~
# 言归正传，现在我们准备引入程序的第一行代码了！当当当当！
import erajs.api as a
# 这个语句十分简单，就是从`erajs`库中引入了`api`模块，并将其重命名为`a`，以方便以后调用。
# 引入完毕后，游戏引擎的全部 API 就已经可以使用了！
# 现在，请让我向你展示，引擎是如何使用的。
# 但在此之前，出于Python对于源代码的读取顺序的原因，我需要向你展示的代码被放在了本文件的末尾。
# 因此，请跳转至本文件的末尾，并寻找`第一章 第二节`的小标题，我会在那里等你，稍后见！
# ---------分割线：请跳转至文件末尾---------

# 第二章 第一节 一起设计一个有吸引力的游戏封面！
# 欢迎！我们又见面了！
# 刚才在1.2里，我们欣赏了游戏引擎的最简单形式，
# 但不得不说的是，如果仅仅是一个“孤零零的”，“不加任何修饰”的按钮放在第一个页面上，看起来总会让人有些不太满意。
# 没关系，我们在这一个小节里面学习制作一个常用的封面，
# 通过对这一节的学习，希望能使你学会游戏引擎的基础排版，和一些常用控件的使用。
# 那么我们开始吧！
# 你也许会好奇，我们在1.2中生成按钮的时候，引用了一个名为`cover`的`界面函数`，那是什么呢？
# 是这样的，我们可以简单的把一个`函数`理解为`被打包起来的几行代码`，
# 那么在Era.js引擎里，我们意识到`函数里面的几行代码`与`界面里面的几个控件`具有一定的相似性。
# 因此，我们在这个的基础上进行了最基本的抽象，这也是Era.js引擎的关键理念之一：
# 函数≈界面，一个函数≈一个界面，因此我们在这里约定：代表一个界面的函数就被称为`界面函数`。
# 很重要哦~ 要记牢。这会方便我们在后续的开发过程中进行抽象，加速开发。
# 好了，现在让我们请出刚才在文末引用了，却不知道究竟在哪儿定义的界面函数：cover！


def ui_legacy():
    # 函数的定义十分简单，一目了然，我就不赘述了。丢一个参考链接吧：
    # 参见：[定义函数](https://docs.python.org/zh-cn/3/tutorial/controlflow.html#defining-functions)
    # 函数定义好后，就能够被引用了！下面我们来往里面填充内容吧！
    a.title('Dev Guide with Era.js v{}'.format(a.version))
    # 首先，这是名为title的API，它的作用也特别直白：设置游戏窗口标题。
    # 标题就是括号里面的内容，但为什么会使用format函数呢？是因为我们要往字符串中塞入一个代表版本的变量。
    # 参见：[字符串函数](https://docs.python.org/zh-cn/3/library/stdtypes.html#str.format)
    # 参见：[格式字符串语法](https://docs.python.org/zh-cn/3/library/string.html#formatstrings)
    # 现在，我们新建一个页面，将原来的单按钮顶下去！
    a.page()
    # 这是名为page的API，作用是新建一个页面，之后的所有控件都在新的页面中生成。
    # 引擎只会显示最新的一个页面，旧的页面会被模糊掉，但不会模糊得十分彻底，而是能够让人勉强看清，以免玩家错过关键信息。
    # 接下来就轮到调整页面版式了！
    # 在默认情况下，页面中的内容都是左对齐的，但这种排布方式不一定都美观，因此我们在这里改变一个排版方式：
    a.mode('grid', 1)
    # 这是名为mode的API负责改变页面排版方式。
    # 在这里，我们将排版方式改为了“grid”(网格)，并且给了他一个参数“1”。
    # 则代表我们将排版模式变成了一个一列网格。
    # 而且网格有一个比较重要的特点，就是在网格中的对齐方式都是居中对齐
    # 这样，我们通过生成一个一列网格来实现了每行居中的功能。
    # 现在，让我们往网格里面装东西吧！
    a.t()
    # 噫？这是装了个什么东西？
    # 这就是传说中的最常用、最有用、最好用的控件——文本控件！
    # 而如果我们不往里面装文本的话（比如现在这个），会发生什么？
    # 答案是换行（换档）！
    # 什么意思呢？比如如果我们的排版模式是`line`，那么执行这个语句，就相当于回车键，
    # 后续的内容都会在下一行进行显示。
    # 而如果我们的排版模式是`grid`，这里我们以三列网格为例，执行这个语句，我们的光标就会从第一行第一个单元格，跳转到第二个单元格。
    # 而如果我们的光标本来就在第一行的第三个单元格，那么执行之后就会跳转到第二行的第一个单元格。
    # 而在这里，我们在一列网格中使用，作用就是从第一行第一个单元格，跳转到第二行第一个单元格，也就意味着换了一行而已。
    # 都是为了美观呀！美观！
    # 好了，终于可以开始装东西了，来！
    a.h('Era.js 开发向导')
    # 这是标题，用法很简单就不赘述了，我们换行
    a.t()
    # 再显示一行文字。
    a.t('Version: {}'.format(a.version))
    # 这里语法与title一样，都是进行了字符串格式化。没有什么特别值得说的东西。
    # 接下来，我们进行几次换行
    for _ in range(4):
        a.t()
    # 一行行换行毕竟太麻烦，这里我们使用循环进行5次换行。再生成控件的话，就会在比较靠下的地方了。
    a.b('　　页面逻辑教程　　', a.goto, ui_logic)
    a.t()
    a.t()
    a.b('　　　控件教程　　　', a.goto, ui_widgets)
    a.t()
    a.t()
    a.b('　　　排版教程　　　', a.goto, ui_compose)
    a.t()
    a.t()
    a.b('　　数据管理教程　　', a.goto, ui_data)
    a.t()
    a.t()
    a.b('　　代码组织教程　　', a.goto, ui_code)
    a.t()
    a.t()
    a.b('　　　模组教程　　　', a.goto, ui_mod)
    a.t()
    a.t()
    a.b('　　　退出教程　　　',  a.msg, '右上角嘛~   真是的！')
    a.t()


def ui_logic():
    def change_page(page):
        # 在这里定义一个简单的换页逻辑
        a.clear(1)  # 从引擎的界面逻辑中去除掉当前的页面
        a.goto(page)  # 进入一个新页面，该页面与原页面属于兄弟节点

    def page1():
        # 当一个子页面完全只属于一个父页面而不需要被其他页面调用时，
        # 可以将象征这个子页面的函数（如：page1）放在父函数（ui_gui_logic）内。
        a.page({'background-color': '#434648'})  # 新建一个红色页面
        a.h('第一页（暨页面着色演示）')
        a.t()
        a.b('返回', a.back)
        a.b('下一页', change_page, page2)
        a.b('回到主界面', a.back, num=2)  # 向 back 传递参数 num，可以指定返回到第几个父节点。

    def page2():
        a.page({'background-color': '#535659'})  # 新建一个页面
        a.h('第二页（暨页面着色演示）')
        a.t()
        a.b('返回', a.back)
        a.b('上一页', change_page, page1)
        a.b('下一页', change_page, page3)
        a.b('回到主界面', a.back, num=2)

    def page3():
        a.page({'background-color': '#636669'})  # 新建一个页面
        a.h('第三页（暨页面着色演示）')
        a.t()
        a.b('返回', a.back)
        a.b('上一页', change_page, page2)
        a.b('回到主界面', a.back, num=2)
    a.page()
    a.h('页面逻辑展示')
    a.t()
    a.b('第一页', a.goto, page1)
    a.b('第二页', a.goto, page2)
    a.b('第三页', a.goto, page3)
    a.b('刷新', a.repeat)  # 当您需要刷新当前界面以显示某些游戏数据的变化时，请用这个方法。
    a.b('返回', a.back)
    a.t()
    a.b('清屏（慎用（请在使用时组合其他界面逻辑））', a.cls)


def ui_widgets():
    def button_result():
        a.msg('按钮已按下')

    def rate_result(new_rate):
        a.msg('您的评分为{}分。'.format(new_rate))

    def radio_result(new_ratio):
        a.msg('现在选中的是第{}位的“{}”。'.format(
            new_ratio['index'], new_ratio['value']
        ))

    def check_result(new_check):
        a.msg('现在复选框的值为：{}'.format(new_check))

    def input_result(new_input):
        a.msg('输入框中的文本为：{}'.format(new_input))

    def dropdown_result(new_dropdown):
        a.msg('下拉菜单中的值为第{}位的“{}”。'.format(
            new_dropdown['index'], new_dropdown['value']
        ))
    a.page()
    a.h('控件一览', 1, {'color': '#eee'})
    a.mode('line')
    a.t('[我是几个文字]')
    a.t('[我跟在左边文字后面]')
    a.t()  # 换行
    a.t('[我被换行了……]')
    a.t('而我有色彩', style={'color': '#f00', 'background-color': '#0f0'})
    a.t()  # 再换行
    a.t('[当你看见我时，你需要点鼠标左键或右键]', True)
    a.t()  # 再换行
    a.t('[当你看见我时，你还是需要点鼠标左键或右键]', True)
    a.t()  # 再换行
    a.b('我是一个红按钮',  button_result, style={'background-color': '#f00'})
    a.b('我是一个不能按的按钮', button_result,  disabled=True)
    a.b('快拿鼠标指着我！', button_result, popup='被你戳到了，好爽~')
    a.divider('我是显而易见的分割线')
    a.t('作为进度条，我当前值为50，总共100，在界面上显示为 100px 长：')
    a.progress(50, 100, [{'width': '100px'}, {}])
    a.t()
    a.t('如果给这个游戏引擎评分，5分满分，我目前给4分：')
    a.rate(4, 5)
    a.t()
    a.t('我是一个可以点的评分哦~点击之后请在后端控制台查看效果~（对着当前评分再点击一次可以取消评分哦~（等价于评0分））：')
    a.rate(2, 5, rate_result)
    a.t()
    a.t('我是一个单选，目前默认选中第二项（索引为1）修改之后请在后端控制台查看效果:')
    a.radio(['一', '二', '三'], radio_result, 1)
    a.t()
    a.t('我是一个复选框，目前默认已选中，修改之后请在后端控制台查看效果:')
    a.check('我是一个复选框哦！', check_result, True)
    a.t()
    a.t('我是输入框，修改之后请在后端控制台查看效果:')
    a.input(input_result, '我是默认值哦~')
    a.t()
    a.t('多行文本输入框：TODO')
    a.t()
    a.t('我是一个下拉菜单哦！（下拉选择项目并在后端查看效果）:')
    a.dropdown(['甲', '乙', '丙'], dropdown_result, 1)
    a.t()
    a.t('多选下拉菜单：TODO')
    a.t()
    a.t('以上，就是目前支持的全部控件及用法啦~')
    a.t()
    a.t('如果您需要新增，请跟作者联系哦~')
    a.t()
    a.b('返回', a.back)


def ui_compose():
    def ui_line_mode():  # 默认模式（左对齐）
        a.page()
        a.mode()
        a.h('一、默认排版（左对齐）')
        a.t()
        a.t('由a.mode()切换排版模式。当前是默认排版，所有控件从左往右排列，使用a.t()进行换行。')
        a.divider()
        a.t('【普通文字】')
        a.t('【未换行】')
        a.t()
        a.t('【已换行】')
        a.t()
        a.t()
        a.divider()
        a.b('下一页', ui_grid_mode)
        a.t()
        a.t()
        a.b('返回', a.back)

    def ui_grid_mode():  # 网格模式（三列）
        a.page()
        a.h('二、网格模式（三列）')
        a.t()
        a.t('由a.mode("grid", 3)切换到3列的网格模式，单元格内不支持换行，换行a.t()在这里代表的是换下一单元格。')
        a.divider()
        a.mode('grid', 3)
        a.t('【文字】')
        a.t('【同单元格的文字】')
        a.t()
        a.t('【下一单元格的文字】')
        a.t()
        a.t('【摩多摩多】')
        a.t()
        a.t('【摩多摩多】')
        a.t()
        a.divider()
        a.mode()
        a.b('下一页', ui_center_mode)
        a.t()
        a.b('返回', a.back)

    def ui_center_mode():  # 网格模式的特殊用法（单列居中）
        a.page()
        a.h('三、网格模式的特殊用法（单列居中）')
        a.t()
        a.t('由a.mode()切换排版模式。当前是默认排版，所有控件从左往右排列，使用a.t()进行换行。')
        a.divider()
        a.mode('grid', 1)
        graph = [
            '墙墙窗窗墙墙窗窗墙墙',
            '墙　　　　　　　　门',
            '墙　　　　　　　　墙',
            '墙汉汉汉汉　　　　墙',
            '墙　　　汉　　　　墙',
            '墙皂我　汉　　　　墙',
            '墙　　　汉　　　　门',
            '墙墙墙墙墙墙墙墙墙墙',
        ]
        for line in graph:
            a.t(line)
            a.t()
        a.t()
        a.divider()
        a.mode()
        a.b('返回', a.back)
    ui_line_mode()


def ui_data():
    def ui_support_file_format():
        a.page()
        a.h('支持的数据文件格式列表')
        a.t()
        a.t()
        a.t('配置文件：*.inf, *.ini, *.cfg, *.config')
        a.t()
        a.t('配置文件的基本格式均为【变量名】=【数据】的格式，适用于存储简单的、易于玩家修改的配置数据。')
        a.t()
        a.t('表格文件：*.csv')
        a.t()
        a.t('CSV文件可以被常见的表格程序打开，但其本身不支持任何排版，若需要储存大量二维数据可以考虑这个方法。十分利于开发者进行编辑修改。')
        a.t()
        a.t('JSON文件：*.json')
        a.t()
        a.t('JSON文件易于储存结构化的数据，系统读写速度非常快，但面向开发者的可读性要稍差一点。')
        a.t()
        a.t('YAML文件：*.yaml, *.yml')
        a.t()
        a.t('YAML文件和JSON文件类似，适用于储存、输入结构化的数据，系统读写速度没有JSON快，但面向开发者的可读性特别高，推荐使用。')
        a.t()
        a.t('ZIP文件：*.zip')
        a.t()
        a.t('ZIP文件是常见的容器文件，里面的文件格式均为JSON，能够整合多个数据文件，方便与其他玩家共享数据时使用。')
        a.t()
        a.t('文本文件：*.txt')
        a.t()
        a.t('最常见的文本文件，读取之后的数据结构为列表，每一行就是列表中的一项，用法全看开发者如何打算。')
        a.t()
        a.t('存档文件：*.save, *.sav')
        a.t()
        a.t('Era.js游戏引擎特有的存档文件，没有什么特别的东西需要介绍的。')
        a.t()
        a.t()
        a.b('返回', a.back)

    def ui_call_data():
        a.page()
        a.h('数据调用')
        a.t()
        a.t()
        a.h('调用配置文件', 3)
        a.t()
        a.t('配置文件放在【config/】文件夹中，通过a.cfg()函数进行调用。')
        a.t()
        a.t()
        a.h('调用静态数据文件', 3)
        a.t()
        a.t('数据文件放在【data/】文件夹中，通过a.dat()函数进行调用。')
        a.t()
        a.t()
        a.h('调用可存档数据', 3)
        a.t()
        a.t('可存档数据是指通过a.sav()函数进行增删查改的数据，而“存档文件”可以理解为“可存档数据”的一个“快照”。当我们进行“保存游戏”的操作时，游戏引擎会将“可存档数据”进行全拷贝并自动生成“存档文件”存放在【save/】文件夹中，而当我们读取存档时，游戏引擎读取“存档文件”中的数据并对“可存档数据”进行完全覆盖。')
        a.t()
        a.t('出于非技术原因，我们约定，可存档数据中的数据不包括Python的对象（如函数、类等）。',
            style={'color': 'white'})
        a.t()
        a.t()
        a.h('调用临时数据', 3)
        a.t()
        a.t('“临时数据”是指游戏运行时生成、供全局调用、但无需保存进存档文件的数据。可通过a.tmp()函数进行调用。当全局数据不知道放哪儿时，放这里准没错。')
        a.t()
        a.t()
        a.b('返回', a.back)

    def ui_save_data():
        def ui_sl_sample():
            def ui_save_widget_sample():
                a.page()
                a.mode()
                a.h('保存存档')
                a.t()
                a.t()
                a.widget_save()
                a.t()
                a.b('返回', a.back)

            def ui_load_widget_sample(callback=None):
                a.page()
                a.mode()
                a.h('加载存档')
                a.t()
                a.t()
                a.widget_load(callback)
                a.t()
                a.b('返回', a.back)

            def ui_custom_save():
                def save_file(i, filename_without_ext):
                    if i == -1:
                        a.save(a.timestamp())
                    else:
                        a.save(filename_without_ext)
                    a.repeat()
                a.page()
                a.mode()
                a.h('保存存档')
                a.t()
                a.t()
                for i, each in enumerate(a.scan_save_file()):
                    a.b('{}. {}'.format(i, each[0]), save_file, i, each[0])
                    a.t()
                a.b('+', save_file, -1, '')
                a.t()
                a.t()
                a.b('返回', a.back)

            def ui_custom_load(callback=None):
                def load_file(i, filename_without_ext):
                    a.load(filename_without_ext)
                    if callback is None:
                        a.back()
                    else:
                        callback()
                a.page()
                a.mode()
                a.h('加载存档')
                a.t()
                a.t()
                for i, each in enumerate(a.scan_save_file()):
                    a.b('{}. {}'.format(i, each[0]), load_file, i, each[0])
                    a.t()
                a.t()
                a.b('返回', a.back)

            def input_callback(value):
                a.sav('test')['input'] = value
            if 'test' not in a.sav():
                a.sav()['test'] = {'input': '请任意修改'}
            a.page()
            a.h('存读档测试')
            a.t()
            a.t()
            a.t('测试文本：')
            a.input(input_callback, a.sav('test')['input'])
            a.t()
            a.t()
            a.b('预设存档页面', a.goto, a.ui_save)
            a.b('预设读档页面', a.goto, a.ui_load)
            a.t()
            a.t()
            a.b('预设存档控件示例', a.goto, ui_save_widget_sample)
            a.b('预设读档控件示例', a.goto, ui_load_widget_sample)
            a.t()
            a.t()
            a.b('自定义存档页面示例', a.goto, ui_custom_save)
            a.b('自定义读档页面示例', a.goto, ui_custom_load)
            a.t()
            a.t()
            a.b('返回', a.back)
            a.t()
        a.page()
        a.h('存档数据管理')
        a.t()
        a.t()
        a.h('保存存档', 3)
        a.t()
        a.t('使用a.save()函数可以直接保存存档，详情请参见API。')
        a.t()
        a.t()
        a.h('加载存档', 3)
        a.t()
        a.t('使用a.load()函数可以直接加载存档，详情请参见API。')
        a.t()
        a.t()
        a.h('保存存档预设控件', 3)
        a.t()
        a.t('引擎提供了一个预设控件函数a.widget_save()，让你可以生成一个块级控件')
        a.t()
        a.t()
        a.h('加载存档预设控件', 3)
        a.t()
        a.t('a.widget_load()')
        a.t()
        a.t()
        a.h('保存存档预设界面', 3)
        a.t()
        a.t('a.ui_save()')
        a.t()
        a.t()
        a.h('加载存档预设界面', 3)
        a.t()
        a.t('a.ui_load()')
        a.t()
        a.t()
        a.b('示例界面', a.goto, ui_sl_sample)
        a.t()
        a.t()
        a.b('返回', a.back)

    def ui_api_tips():
        a.page()
        a.h('API使用注意事项')
        a.t()
        a.t()
        a.t('在设置文件根节点时我们可能遇到这个问题：')
        a.t()
        a.t('a.dat("test.list")=[1,2,3]')
        a.t()
        a.t('会报错，原因是python会将等号左侧识别为一个函数，而不会将他识别为一个函数的返回值。')
        a.t()
        a.t('我们可以用下列代码来代替：')
        a.t()
        a.t('a.dat()["test.list"]=[1,2,3]')
        a.t()
        a.t()
        a.b('返回', a.back)
    a.page()
    a.mode()
    a.h('数据管理教程')
    a.t()
    a.t()
    a.t('在v0.2中，数据系统与v0.1相比，有了较大改变，我们来逐项说明。')
    a.t()
    a.t('引擎支持的数据文件格式参见：')
    a.b('格式列表', a.goto, ui_support_file_format)
    a.t()
    a.t('调用文件的API进行了变更，参见：')
    a.b('数据调用', a.goto, ui_call_data)
    a.t()
    a.t('新版引擎对存档的支持进行了增强，参见：')
    a.b('存档数据管理', a.goto, ui_save_data)
    a.t()
    a.t('新的API在使用时有一些需要注意的地方，参见：')
    a.b('API使用注意事项', a.goto, ui_api_tips)
    a.t()
    a.t()
    a.b('返回', a.back)


def ui_code():
    a.page()
    a.mode('grid', 1)
    a.h('代码组织教程')
    a.t()
    a.t()
    a.t('和以前是一样的嘛！')
    a.t()
    a.t()
    a.b('也就是说还没写咯？', a.back)


def ui_mod():
    def rest():
        a.msg('我会很快搞定的，等我！')
        a.back()
    a.page()
    a.mode('grid', 1)
    a.h('我还没想好怎么写教程……')
    a.t()
    a.t()
    a.b('我先暂时不用吧', rest)


# 第二章 第一节 先进架构
# 学完了以上的内容，现在就可以开始学习更加先进的东西了：游戏架构


def launcher():
    if('ui' not in a.tmp() or 'cover' not in a.tmp('ui')):
        a.t('[ERROR]请安装并激活含有封面的模组！', style={'color': 'red'})
    else:
        a.tmp('ui')['cover']()


# ---------分割线---------
# 第一章 第二节 最简单的页面有多简单？
# 欢迎回来！现在请让我向你展示一个最简单的界面！请看好：
a.init()  # 初始化引擎
a.b('进入向导', a.goto, ui_legacy)  # 生成一个按钮
# 完成！
# 怎样？是不是觉得特别简单？确实就是如此简单！
# 这两行代码做的事情很简单：
# 1. 引擎初始化；
# 2. 生成一个文字为`进入向导`，且点击之后就会进入`cover`页面函数的`按钮`。
# 是不是特别直白？这也是游戏引擎 API 设计时十分注重的点。
# 在这里，`b`是`button`的别名，你可以用button来代替b，效果是一样的。试试看？
# `b`和`button`具有同样的效果，但本引擎`推荐`都使用缩写，
# 因为在以后的开发过程中，h(标题,heading)、t(文本,text)、b(按钮,button)和l(链接,link)都是日常最频繁使用的元素，
# 适当的缩写可以提高代码中有效信息的密度，且不会被大量令人眼花的文字给看晕。
# 而关于init这个API呢，做的事情很复杂，你可以仔细看看后端究竟输出了什么，会让你对初始化的流程有一个基本的认识。我们会以后再聊。
# 好了，这就是最简单的界面了，你看看前端，是不是有一个可爱的小按钮出现呢？
# 点击它，我们出发去往第二章，第二章的源代码在当初`第一章 第一节`的后面。
# 我们在那儿碰面！
