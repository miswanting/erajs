const {
    ipcRenderer
} = require('electron')

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
    if (package['type'] == 'pcmd') {
        game.pcmd(package['value'])
    }
    if (package['type'] == 'plcmd') {
        game.plcmd(package['value'])
    }
    if (package['type'] == 'new_page') {
        newPage()
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
}

function newLine() {
    if ($(".current-line").length != 0) {
        $(".current-line").removeClass("current-line")
    }
    let newLine = $("<p></p>")
    newLine.addClass("my-0 clearfix current-line")
    newLine.css("word-break", "break-all")
    $(".current-page").append(newLine)
    let leftAlign = $("<p></p>")
    let rightAlign = $("<p></p>")
    $(".current-line").append(newLine)
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
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            newPage()
        }
        if (package['line']) {
            if (package['value'] == '') {
                newLine()
                $(".current-line").append('<br />')
            } else {
                newLine()
                $(".current-line").append(package['value'])
            }
            $(".current-line").removeClass("current-line")
        } else {
            if ($(".current-line").length == 0) {
                newLine()
            }
            // 将文字添加到当前行的末尾。
            $(".current-line").append(package['value'])
        }
    },
    'pcmd': function (text) {
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            newPage()
        }
        // 检查是否存在当前行。如果没有，创建之。
        if ($(".current-line").length == 0) {
            newLine()
        }
        // 将按钮添加到当前行的末尾。
        let newButton = $("<div></div>")
        newButton.append(text)
        newButton.addClass("d-inline-flex mx-1 px-1 bg-primary text-white")
        newButton.css("cursor", "pointer")
        newButton.click(function () {
            package = {
                'type': 'pcmd_return',
                'value': $(this).text()
            }
            send(package)
        })
        $(".current-line").append(newButton)
    },
    'plcmd': function (text) {
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            newPage()
        }
        // 检查是否存在当前行。如果没有，创建之。
        if ($(".current-line").length == 0) {
            newLine()
        }
        // 将按钮添加到当前行的末尾。
        newLine()
        let newButton = $("<div></div>")
        newButton.append(text)
        newButton.addClass("d-inline-flex px-1 bg-primary text-white")
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