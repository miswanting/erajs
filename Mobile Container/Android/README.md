# 构建指南

我们来构建一个引擎！

## 安装系统

https://manjaro.org/downloads/official/xfce/

`Download Minimal`

内存：4096MB

硬盘：16GB

## 下载代码

打开一个终端

```bash
git clone https://github.com/miswanting/Era.js
```

## 配置环境

打开另一个终端

### 设置系统镜像（可选）

``````bash
sudo pacman-mirrors -i -c China -m rank
``````

### 同步系统软件库

> https://wiki.archlinux.org/index.php/Pacman

```bash
sudo pacman -Syu
```

如果同步过程中出现问题，尝试：

```bash
sudo pacman -Syyu
```

### 安装Python3

> https://wiki.archlinux.org/index.php/Python

```bash
sudo pacman -S python python-pip
```

### 配置Pypi镜像（可选）

> https://mirrors.tuna.tsinghua.edu.cn/help/pypi/

```bash
pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### 安装Buildozer

> https://buildozer.readthedocs.io/en/latest/installation.html

```bash
pip3 install --user --upgrade buildozer
```

### 安装运行依赖

```bash
sudo pacman -S cython jdk8-openjdk gcc cmake autoconf
```

## 构建引擎

在Git clone完成之后，进入目录：

```bash
cd Era.js/Mobile Container/Android/
```

开始Android/debug build

```bash
buildozer -v android debug
```

时间较长，保持网络通畅，放松一下吧~