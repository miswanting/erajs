# 迁移指南 Migration Guide（v0.1→v0.2）

## 非兼容变更 Breakings Changes

### Page

```python
page(color: str = 'default') -> None
page(style: Optional[Dict[str, str]] = None)
```

### H

```python
h(text, rank=1, color='default', bcolor='default') -> None
heading(text: Optional[str] = None, rank: int = 1, style: Optional[Dict[str, str]] = None)
```

### T

```python
t(text: str = '', wait: bool = False, color: str = 'default', bcolor: str = 'default') -> None
t(text: Optional[str] = None, wait: bool = False, style: Optional[Dict[str, str]] = None)
```

### B

```python
b(text: str, func: callable = None, *arg, **kw) -> None
b(text: Optional[str] = None, callback: Optional[Callable[[], NoReturn]] = None, *arg, **kw)
```

### L

```python
l(text: str, func: callable = None, *arg, **kw) -> None
l(text: Optional[str] = None, callback: Optional[Callable[[], NoReturn]] = None, style: Optional[Dict[str, str]] = None, *arg, **kw)
```

### Progress

```python
progress(now, max=100, length=100) -> None
progress(now: Literal[0] = 0, max: Literal[100] = 100, style: Optional[Dict[str, str]] = None)
```

### Radio

```python
radio(choice_list, default_index=0, func=None) -> None
radio(text_list, callback=None, default_index=0, style: Optional[Dict[str, str]] = None)
```

### Dropdown

```python
dropdown(options, func=None, default='', search=False, multiple=False, placeholder='', allowAdditions=False) -> None
dropdown(text_list=None, callback=None, default_index=0, search=False, multiple=False, placeholder='', allowAdditions=False, style: Optional[Dict[str, str]] = None)
```

### Clear

```python
clear(num=0) -> None
cls(num=0)
```

### Clear GUI

```python
clear_gui(num=0) -> None
clear(num=0)
```

### Append GUI

```python
append_gui(func, *arg, **kw) -> None
insert(ui_func, *arg, **kw)
```

### Get GUI List

```python
get_gui_list() -> None
get_gui_stack()
```

### New Hash

```python
new_hash() -> str
random_hash(level=4)
```

## 普通变更 Changes

### Debug

```python
debug(text: str)
debug(*arg: Tuple[str, None], **kw: Dict[str, Tuple[Any]])
info(text: str)
info(*arg: Tuple[str, None], **kw: Dict[str, Tuple[Any]])
warn(text: str)
warn(*arg: Tuple[str, None], **kw: Dict[str, Tuple[Any]])
error(text: str)
error(*arg: Tuple[str, None], **kw: Dict[str, Tuple[Any]])
critical(text: str)
critical(*arg: Tuple[str, None], **kw: Dict[str, Tuple[Any]])
```

### Title

```python
title(text: str) -> None
title(text: str, style: Optional[Dict[str, str]] = None)
```

### Rate

```python
rate(now=0,  max=5, func=None, disabled=True) -> None
rate(now=0, max=5, callback=None, style: Optional[Dict[str, str]] = None)
```

### Input

```python
input(func=None, default='') -> None
input(callback=None, default='', is_area=False, placeholder='', style: Optional[Dict[str, str]] = None)
```

### Divider

```python
divider(text='') -> None
divider(text=None, style: Optional[Dict[str, str]] = None)
```

### Data

```python

```

### Mode

```python
mode(type='default', *arg, **kw) -> None
mode(type='line', *arg, **kw)
```

### Exit

```python
exit(save=False) -> None
exit(auto_save: bool = False)
```

## 弃用

### Time

get_full_time
tick
Deprecated
