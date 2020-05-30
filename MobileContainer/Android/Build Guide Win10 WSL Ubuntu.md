# 构建指南

我们来构建一个引擎！

## 下载代码

打开一个终端

```bash
git clone https://github.com/miswanting/Era.js
```

## 配置环境

打开另一个终端

### 设置系统镜像源（可选）

> https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/

### 同步系统软件库

```bash
sudo apt update
```

### 更新软件库软件

```bash
sudo apt upgrade
```

### 安装Python3

> https://wiki.archlinux.org/index.php/Python

```bash
sudo apt install python3-pip
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
sudo pacman -S cython jdk8-openjdk patch gcc cmake autoconf automake
```

## 构建引擎

在Git clone完成之后，进入目录：

```bash
cd Era.js/MobileContainer/Android/
```

开始Android/debug build

```bash
buildozer -v android debug
```

时间较长，保持网络通畅，放松一下吧~

> 'env': env must be a dict
>
> https://askubuntu.com/questions/1233200/buildozer-crashed-with-env-env-must-be-a-dict