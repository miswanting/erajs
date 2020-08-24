/**
 * # Loader
 * 资源加载器
 */
class Loader {
    constructor() {
        this.resources = []
        this.progress = {
            now: 0,
            max: 0
        }
        this.done = false
    }
    addResource = (url, text = '', type = null) => {
        this.done = false
        if (!type) {
            type = url.split(".").slice(-1)
        }
        this.progress.max += 1
        this.resources.push([url, text, type])
    }
    load = (callback) => {
        if (this.progress.now < this.progress.max) {
            let task = this.resources[this.progress.now]
            let req = new XMLHttpRequest()
            req.addEventListener("progress", (e) => {
                e.now = this.progress.now
                e.max = this.progress.max
                e.text = task[1]
                // let contentLength;
                if (e.lengthComputable) {
                    e.length = e.total;
                } else {
                    e.length = parseInt(e.target.getResponseHeader('content-length'), 10);
                }
                callback(e)
            })
            req.addEventListener("load", (e) => {
                e.now = this.progress.now
                e.max = this.progress.max
                e.text = task[1]
                this.progress.now += 1
                if (this.progress.now >= this.progress.max) {
                    // 最后一个文件加载完成
                    this.done = true
                }
                this.mount(e.target.response, task[2])
                this.load(callback)
                callback(e)
            })
            req.addEventListener("error", (e) => {
                console.log(e);
            })
            req.addEventListener("abort", (e) => {
                console.log(e);
            })
            req.open("GET", task[0])
            req.send()
        }
    }
    mount = (data, type) => {
        let res
        if (type == "js") {
            res = document.createElement('script')
            res.innerHTML = data
        }
        else if (type == "css") {
            res = document.createElement('style')
            res.innerHTML = data
        }
        document.head.appendChild(res)
    }
    /**
     * load
     * 加载资源
     * @param {*} url
     * 资源路径 
     * @param {*} callback 
     * 完成后回调函数
     */
    old_load(url, callback, type = null) {
        if (!type) {
            type = url.split(".").slice(-1)
        }
        let res;
        if (type == "js") {
            res = document.createElement('script');
            res.setAttribute("type", "text/javascript");
            // res.setAttribute("crossorigin", "");
            res.setAttribute("src", url);
            // res.setAttribute("type", "module");
            document.getElementsByTagName("head")[0].appendChild(res);
        }
        else if (type == "css") {
            res = document.createElement("link");
            res.setAttribute("type", "text/css");
            res.setAttribute("href", url);
            res.setAttribute("rel", "stylesheet");
            document.getElementsByTagName("head")[0].appendChild(res);
        }
        if (typeof (callback) != "undefined") {
            if (res.readyState) {
                res.onreadystatechange = function () {
                    if (res.readyState == "loaded" || res.readyState == "complete") {
                        res.onreadystatechange = null;
                        callback();
                    }
                }
            } else {
                res.onload = function () {
                    callback();
                }
            }
        }
    }
}