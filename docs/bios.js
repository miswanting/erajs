/**
 * load
 * @param {*} url 
 * @param {*} callback 
 * @param {*} type 
 */
function load(url, callback = null, type = null) {
    if (!type) {
        type = url.split(".").slice(-1)
    }
    let res; // DOM element
    if (type == "js") {
        res = document.createElement('script');
        res.setAttribute("type", "text/javascript");
        res.setAttribute("src", url);
        document.querySelector('head')?.appendChild(res);
    }
    else if (type == "css") {
        res = document.createElement("link");
        res.setAttribute("type", "text/css");
        res.setAttribute("href", url);
        res.setAttribute("rel", "stylesheet");
        document.querySelector("head")?.appendChild(res);
    }
    if (callback) {
        if (res?.readyState) {
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
function loadRes1by1(queue, progress, callback) {
    i = 0
    function check() {
        if (i == queue.length) {
            callback()
        }
        else {
            load(queue[i][0], () => {
                progress(queue[i][1])
                i++
                check()
            })
        }
    }
    check()
}