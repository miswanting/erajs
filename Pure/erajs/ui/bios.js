/**
 * # Loader
 * 资源加载器
 */
class Loader {
    /**
     * load
     * 加载资源
     * @param {*} url
     * 资源路径 
     * @param {*} callback 
     * 完成后回调函数
     */
    load(url, callback, type = null) {
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