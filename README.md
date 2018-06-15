# Era.js

## 显示层级

- div(root)
  - div(list): Page Manager
    - div(page): Line Manager
      - p
        - text
        - div(word)
        - progressbar
    - div(page)

## 系统层级

### Server

### Client

## API（game）

- [x] p（输出文字（不换行，不等待））
- [x] pl（输出文字（换行，不等待））
- [ ] pw（输出文字（不换行，等待））
- [ ] plw（输出文字（换行，等待））
- [ ] pcmd（输出命令）
- [ ] pline（输出一条隔断线）
- [ ] s（等待输入（不换页））
- [ ] sp（等待输入（换页））
- [ ] cls（清屏（换页））
- [ ] clear（清屏（全部））
- [ ] data（数据输入输出）
- [ ] save（保存game.data）
- [ ] load（载入game.data）
- [ ] goto（前进到子界面）
- [ ] back（返回到父界面）
- [ ] next（显示下一界面）
- [ ] prev（显示上一界面）
- [ ] repeat（重新显示当前界面）
- [ ] yesOrNo

