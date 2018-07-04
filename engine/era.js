const {
    ipcRenderer
} = require('electron')
var sys = {
    mode: 'plain',
    mode_arg: [],
    mode_cache: []
}
// 侦听鼠标
$(document).ready(function () {
    $("#root").mousedown(function (event) {
        if (event.which == 1) {
            package = {
                'type': 'mouse_down',
                'value': 1
            }
            send(package)
        }
        if (event.which == 3) {
            package = {
                'type': 'mouse_down',
                'value': 3
            }
            send(package)
        }
    })
});
// 接受信息
ipcRenderer.on('package', (event, data) => {
    data = data.toString().split('}{')
    for (let i = 0; i < data.length; i++) {
        if (i != data.length - 1) {
            data[i] += '}'
        }
        if (i != 0) {
            data[i] = '{' + data[i]
        }
    }
    for (let i = 0; i < data.length; i++) {
        console.log('[DEBG]接收：', data[i]);
        package = JSON.parse(data[i])
        doPackage(package)
    }
})
// 发射信息
function send(package) {
    console.log('[DEBG]发送：', JSON.stringify(package));
    ipcRenderer.send('package', JSON.stringify(package))
}
// 处理信息（功能注册表）
function doPackage(package) {
    if (package['type'] == 'test') {
        send(package)
    }
    if (package['type'] == 'p') {
        p(package)
    }
    if (package['type'] == 'cmd') {
        cmd(package)
    }
    if (package['type'] == 'h1') {
        h1(package)
    }
    if (package['type'] == 'progress') {
        progress(package)
    }
    if (package['type'] == 'new_page') {
        newPage()
    }
    if (package['type'] == 'mode') {
        mode(package.value, package.arg)
    }
}
// 新建页面
function newPage() {
    // $(".current-line").removeClass("current-line")
    // $(".current-page").removeClass("current-page")
    let newPage = $("<div></div>")
    newPage.addClass("shadow-sm m-2 p-2 page")
    $("#list").append(newPage)
    mode('plain')
}
// 新建“行”
function newLine() {
    // 关闭全部激活行
    // $(".current-line").removeClass("current-line")
    if (sys.mode == 'plain') {
        // 创建一个新行并激活
        let newLine = $("<p></p>")
        newLine.addClass("text-dark my-0 line")
        newLine.css("word-break", "break-all")
        $(".page").last().append(newLine)
    } else if (sys.mode == 'grid') {
        // 创建一个新块并激活
        if (sys.mode_cache % sys.mode_arg == 0) {
            let newRow = $("<div></div>")
            newRow.addClass("row text-dark")
            $(".container-fluid").last().append(newRow)
        }
        let newLine = $("<div></div>")
        newLine.addClass("col d-flex justify-content-center px-0 line")
        $(".row").last().append(newLine)
        sys.mode_cache += 1
    }
}

function p(package) {
    if ($(".page").length == 0) {
        newPage()
    }
    let text = package.value.toString()
    if ($(".page").last().find('.line').length == 0) {
        newLine()
    }
    if (text == '') {
        if ($('.page').last().find('.line').last()[0].innerHTML == '') {
            $('.page').last().find('.line').last().append('<br>')
        }
        newLine()
    } else {
        if (text == ' ') {
            text = '&nbsp;'
        }
        $(".line").last().append(text)
    }
}

function cmd(package) {
    // 检查是否存在当前页。如果没有，创建之。
    if ($(".page").length == 0) {
        newPage()
    }
    // 将按钮添加到最后行的末尾。
    let newButton = $("<div></div>")
    newButton.append(package.value)
    newButton.addClass("d-inline-flex mx-1 px-1 bg-light text-dark")
    newButton.css("cursor", "pointer")
    newButton.click(function () {
        package = {
            'type': 'cmd_return',
            'hash': package.hash
        }
        send(package)
    })
    $(".line").last().append(newButton)
}

function h1(package) {
    // 检查是否存在当前页。如果没有，创建之。
    if ($(".page").length == 0) {
        newPage()
    }
    newLine()
    let new_h1 = $("<h1></h1>")
    new_h1.addClass('m-0')
    new_h1.append(package['value'])
    $(".line").last().append(new_h1)
    newLine()
    // $(".current-line").removeClass("current-line")
}

function progress(package) {
    let now = package['now']
    let max = package['max']
    let length = package['length']
    // 检查是否存在当前页。如果没有，创建之。
    if ($(".page").length == 0) {
        newPage()
    }
    // 检查是否存在当前行。如果没有，创建之。
    if ($(".page").last().find('.line').length == 0) {
        newLine()
    }
    let progress_container = $("<div></div>")
    progress_container.addClass("progress bg-light align-middle mx-1")
    progress_container.css("width", length.toString() + "px")
    // progress_container.css("height", "100%")
    progress_container.css("display", "inline-block")
    let progress_bar = $("<div></div>")
    progress_bar.addClass("progress-bar bg-dark h-100")
    progress_bar.css("width", (now / max * 100).toString() + "%")
    progress_container.append(progress_bar)
    $('.page').last().find('.line').last().append(progress_container)
}

function mode(value, arg = null) {
    console.log(value, arg);
    if ($(".page").length == 0) {
        newPage()
    }
    // $(".current-line").removeClass("current-line")
    if (value == 'plain') {
        sys.mode = 'plain'
        sys.mode_cache = null
    }
    if (value == 'grid') {
        sys.mode = 'grid'
        sys.mode_arg = arg[0]
        sys.mode_cache = 0
        let newContainer = $("<div></div>")
        newContainer.addClass("container-fluid px-0")
        $(".page").last().append(newContainer)
        newLine()
    }
}