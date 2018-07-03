const {
    ipcRenderer
} = require('electron')
let mode = ['plain']
let mode_cache = []

function send(package) {
    console.log('[DEBG]发送：', JSON.stringify(package));
    ipcRenderer.send('package', JSON.stringify(package))
}

function doPackage(package) {
    if (package['type'] == 'test') {
        send(package)
    }
    if (package['type'] == 'p') {
        game.p(package)
    }
    if (package['type'] == 'cmd') {
        game.cmd(package['value'], package['line'])
    }
    if (package['type'] == 'h1') {
        game.h1(package)
    }
    if (package['type'] == 'progress') {
        game.progress(package)
    }
    if (package['type'] == 'new_page') {
        newPage()
    }
    if (package['type'] == 'mode') {
        game.mode(package.value[0], package.value.slice(1))
    }
}

function newPage() {
    if ($(".current-line").length != 0) {
        $(".current-line").removeClass("current-line")
    }
    if ($(".current-page").length != 0) {
        $(".current-page").removeClass("current-page")
    }
    let newPage = $("<div></div>")
    newPage.addClass("shadow-sm m-2 p-2 current-page")
    $("#list").append(newPage)
    game.mode('plain')
}

function newLine() {
    // 关闭全部激活行
    $(".current-line").removeClass("current-line")
    console.log(mode);

    if (mode[0] == 'plain') {
        // 创建一个新行并激活
        let newLine = $("<p></p>")
        newLine.addClass("text-dark my-0 current-line")
        newLine.css("word-break", "break-all")
        $(".current-page").append(newLine)
    } else if (mode[0] == ['grid']) {
        // 创建一个新块并激活
        console.log(mode_cache[0] % mode[1]);
        if (mode_cache[0] % mode[1] == 0) {
            let newRow = $("<div></div>")
            newRow.addClass("row text-dark")
            console.log($(".container-fluid"));
            $(".container-fluid").last().append(newRow)
        }
        let newLine = $("<div></div>")
        newLine.addClass("col d-flex justify-content-center px-0 current-line")
        $(".row").last().append(newLine)
        mode_cache[0] += 1
    }
}
ipcRenderer.on('package', (event, data) => {
    // console.log(data)
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
game = {
    'p': function (package) {
        if ($(".current-page").length == 0) {
            newPage()
        }
        let text = package.value.toString()
        if (text == '' || package.isolate || $(".current-line").length == 0) {
            newLine()
        }
        $(".current-line").append(text)
        if (package.isolate) {
            $(".current-line").append('<br>')
            $(".current-line").removeClass("current-line")
        }
    },
    'cmd': function (text, line) {
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            newPage()
        }
        // 检查是否存在当前行。如果没有，创建之。
        if ($(".current-line").length == 0) {
            newLine()
        } else if (line) {
            newLine()
        }
        // 将按钮添加到当前行的末尾。
        let newButton = $("<div></div>")
        newButton.append(text)
        newButton.addClass("d-inline-flex mx-1 px-1 bg-light text-dark")
        newButton.css("cursor", "pointer")
        newButton.click(function () {
            package = {
                'type': 'cmd_return',
                'value': $(this).text()
            }
            send(package)
        })
        $(".current-line").append(newButton)
    },
    'h1': function (package) {
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            newPage()
        }
        newLine()
        let new_h1 = $("<h1></h1>")
        new_h1.addClass('m-0')
        new_h1.append(package['value'])
        $(".current-line").append(new_h1)
        $(".current-line").removeClass("current-line")
    },
    'progress': function (package) {
        let now = package['now']
        let max = package['max']
        let length = package['length']
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            newPage()
        }
        // 检查是否存在当前行。如果没有，创建之。
        if ($(".current-line").length == 0) {
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
        $(".current-line").append(progress_container)
    },
    'mode': function (name, value=null) {
        if ($(".current-page").length == 0) {
            newPage()
        }
        $(".current-line").removeClass("current-line")
        if (name == 'plain') {
            mode = [name]
            mode_cache = null
        }
        if (name == 'grid') {
            mode = [name, value]
            mode_cache = [0]
            let newContainer = $("<div></div>")
            newContainer.addClass("container-fluid px-0")
            $(".current-page").append(newContainer)
        }
    }
}
$(document).ready(function () {
    $("#root").mousedown(function (event) {
        console.log(event.which);
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