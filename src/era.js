const {
    ipcRenderer
} = require('electron')

function doPackage(package) {
    if (package['type'] == 'test') {
        console.log('[DEBG]发送：', JSON.stringify(package));
        ipcRenderer.send('package', JSON.stringify(package))
    }
    if (package['type'] == 'p') {
        game.p(package['value'])
    }
    if (package['type'] == 'pl') {
        game.pl(package['value'])
    }
    if (package['type'] == 'pw') {
        game.pw(package['value'])
    }
    if (package['type'] == 'plw') {
        game.plw(package['value'])
    }
    if (package['type'] == 'pcmd') {
        game.pcmd(package['value'])
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
    'p': function (text) {
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            let newPage = $("<div></div>")
            newPage.addClass("current-page")
            $("#list").append(newPage)
        }
        // 检查是否存在当前行。如果没有，创建之。
        if ($(".current-line").length == 0) {
            let newLine = $("<p></p>")
            newLine.addClass("m-0 current-line")
            newLine.css("word-break", "break-all")
            $(".current-page").append(newLine)
        }
        // 将文字添加到当前行的末尾。
        $(".current-line").append(text)
        // $("#list").append($("<div></div>").text(text).css("display", "inline-block"))
        // $("#list").append("<div style='display: inline-block'>" + text + "</div>")
    },
    'pl': function (text) {
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            let newPage = $("<div></div>")
            newPage.addClass("current-page")
            $("#list").append(newPage)
        }
        // 检查是否存在当前行。如果有，关闭之；如果没有，创建并关闭之。
        if ($(".current-line").length >= 0) {
            $(".current-line").removeClass("current-line")
        }
        let newLine = $("<p></p>")
        newLine.addClass("m-0 current-line")
        newLine.css("word-break", "break-all")
        $(".current-page").append(newLine)
        $(".current-line").append(text)
        $(".current-line").removeClass("current-line")
    },
    'pw': function (text) {
        game.p(text)
    },
    'plw': function (text) {
        game.pl(text)
    },
    'pcmd': function (text) {
        // 检查是否存在当前页。如果没有，创建之。
        if ($(".current-page").length == 0) {
            let newPage = $("<div></div>")
            newPage.addClass("current-page")
            $("#list").append(newPage)
        }
        // 检查是否存在当前行。如果有，关闭之；如果没有，创建并关闭之。
        if ($(".current-line").length >= 0) {
            $(".current-line").removeClass("current-line")
        }
        let newLine = $("<p></p>")
        newLine.addClass("m-0 current-line")
        newLine.css("word-break", "break-all")
        $(".current-page").append(newLine)
        $(".current-line").append(text)
        $(".current-line").removeClass("current-line")
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
            ipcRenderer.send('package', JSON.stringify(package))
        }
        if (event.which == 3) {
            package = {
                'type': 'mouse_down',
                'value': 3
            }
            ipcRenderer.send('package', JSON.stringify(package))
        }
    })
});