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
    } else if (package['type'] == 'p') {
        p(package)
    } else if (package['type'] == 'cmd') {
        cmd(package)
    } else if (package['type'] == 'h1') {
        h1(package)
    } else if (package['type'] == 'progress') {
        progress(package)
    } else if (package['type'] == 'new_page') {
        newPage()
    } else if (package['type'] == 'mode') {
        mode(package.value, package.arg)
    } else if (package['type'] == 'title') {
        title(package)
    } else if (package['type'] == 'input') {
        input(package)
    } else if (package['type'] == 'clear_page') {
        clear_page()
    }
}
// 新建页面
function newPage() {
    // $(".current-line").removeClass("current-line")
    // $(".current-page").removeClass("current-page")
    $('.page').attr('disabled', 'disabled')
    let newPage = $("<fieldset></fieldset>")
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
    } else if (sys.mode == 'cover') {
        // 创建一个新行并激活
        let newLine = $("<p></p>")
        newLine.addClass("d-flex justify-content-center my-0 line")
        newLine.css("word-break", "break-all")
        $(".ban").last().append(newLine)
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

// function cmd(package) {
//     // 检查是否存在当前页。如果没有，创建之。
//     if ($(".page").length == 0) {
//         newPage()
//     }
//     // 将按钮添加到最后行的末尾。
//     let newButton = $("<div></div>")
//     newButton.append(package.value)
//     newButton.addClass("d-inline-flex mx-1 px-1 bg-light text-dark")
//     newButton.css("cursor", "pointer")
//     newButton.click(function () {
//         $(this).unbind("click")
//         $(this).attr('disabled', 'disabled')
//         package = {
//             'type': 'cmd_return',
//             'hash': package.hash
//         }
//         send(package)
//     })
//     $(".line").last().append(newButton)
// }
function cmd(package) {
    // 检查是否存在当前页。如果没有，创建之。
    if ($(".page").length == 0) {
        newPage()
    }
    // 将按钮添加到最后行的末尾。
    let newButton = $("<button></button>")
    newButton.append(package.value)
    if (sys.mode == 'cover') {
        newButton.addClass("btn btn-outline-light")
    }
    else {
        newButton.addClass("btn btn-light btn-sm border-0 py-0 px-1")
    }
    newButton.css("cursor", "pointer")
    newButton.click(function () {
        // $(this).unbind("click")
        // $(this).attr('disabled', 'disabled')
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
    if ($(".page").last().find('.line').length == 0) {
        newLine()
    }
    let new_h1 = $("<h1></h1>")
    new_h1.addClass('m-0')
    new_h1.append(package['value'])
    $(".line").last().append(new_h1)
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
    // $(".cover").fadeOut()
    $(".cover").parent().addClass('invisible')
    if ($(".page").length == 0) {
        newPage()
    }
    // $(".current-line").removeClass("current-line")
    if (value == 'plain') {
        sys.mode = 'plain'
        sys.mode_cache = null
        newLine()
    }
    if (value == 'grid') {
        sys.mode = 'grid'
        sys.mode_arg = arg[0]
        sys.mode_cache = 0
        let newContainer = $("<div></div>")
        newContainer.addClass("container-fluid px-0")
        $(".page").last().append(newContainer)
        newLine()
    } if (value == 'cover') {
        sys.mode = 'cover'
        sys.mode_arg = arg[0]
        sys.mode_cache = 0
        let newCover = $("<div></div>")
        newCover.addClass("d-flex justify-content-center align-items-center text-white bg-success w-100 h-100 cover")
        newCover.css('position', 'absolute')
        newCover.css('top', 0)
        newCover.css('left', 0)
        $(".page").last().append(newCover)
        let newBan = $("<div></div>")
        newBan.addClass("d-flex flex-column ban")
        $(".cover").last().append(newBan)
        newLine()
    }
}

function title(package) {
    $('title').text(package.value)
}
function input(package) {
    if ($(".page").length == 0) {
        newPage()
    }
    let newInput = $("<input>")
    newInput.addClass('form-control form-control-sm')
    newInput.attr('placeholder', package.value)
    newInput.attr('autofocus', 'autofocus')
    newInput.keyup(function (e) {
        if (e.which == 13) {
            $(this).unbind("keyup")
            $(this).attr('disabled', 'disabled')
            // $('input')
            package = {
                'type': 'input_return',
                'value': this.value
            }
            send(package)
        }
    })
    $(".line").last().append(newInput)
}
function clear_page() {
    $(".page").remove()
}