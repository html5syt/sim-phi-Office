# Phixos PPT Add-in

## 简介

$\text{Phi\color{red}x\color{green}os}=\color{red}\xcancel{\text{\color{black}Phi{g}ros}}\text{ \color{green}On/Offline Simulator}$

> 这不是 Phi&#103;ros，这是可在线/离线运行的模拟器！

如题，用 JS/Canvas 还原 [Phi&#103;ros](https://www.taptap.com/app/165287) 画面。

本项目属于个人兴趣项目，仅用于学习和测试。

由于本项目正在进行模块化重构，近期代码可能存在较大变动。

### 特别感谢

- [@luch4736](https://github.com/luch4736) 提供 iPad (Safari on iOS 15.6+)
- [@cgluWxh](https://github.com/cgluWxh) 提供 iPhone (Safari on iOS 12.5.7)
- [@AsakuraMizu](https://github.com/AsakuraMizu) 强力推荐的 [Vite](https://vitejs.dev) 驱动！
- 以及看到这个页面的你！

# sim-phi模拟器文档

访问 <!-- prettier-ignore -->[docs.lchz&#104;.net](https://docs.lchz&#104;.net/project/sim-phi-core) (Working in progress)

# Office插件文档

## 1. 安装
1. 前往[Release](https://github.com/html5syt/sim-phi-Office/releases)下载最新版插件压缩包，并解压。
2. **以管理员身份** 运行“安装本地https证书.bat”以安装本地Https证书。*Macos用户请自行处理证书问题，可在网上查找“本地https证书”，建议使用[mkcert](https://github.com/FiloSottile/mkcert)并参考上述脚本内容安装证书到相应位置。*
3. 由于我无法上架该插件到PPT内的加载项应用市场，需要通过旁加载的方式安装，请访问[https://learn.microsoft.com/zh-cn/office/dev/add-ins/testing/test-debug-office-add-ins?view=powerpoint-js-preview#sideload-an-office-add-in-for-testing](https://learn.microsoft.com/zh-cn/office/dev/add-ins/testing/test-debug-office-add-ins?view=powerpoint-js-preview#sideload-an-office-add-in-for-testing)获取不同平台的安装说明。**注：清单文件为插件目录下的`manifest.xml`，安装方式以手动安装为准，无需安装VSCode等IDE工具**。

## 2. 配置
### 2.1 PPT文件
由于PPT插件的各方面限制，你需要一个只由两页PPT组成的PPT文件，**不能将其用于≥2页的PPT，否则将引发错误。** 其中**第一页为Loading页面，第二页为加载项页面，不得更换顺序**。建议在放映设置中启用“在展台放映”以屏蔽PPT原有快捷键。插件目录下有示例PPT文件，可参考使用。

若需要配合其他PPT文件使用，请链接到**第二张（加载项）** PPT，无需设置任何自动换页时间；若直接放映，请从**第一页（Loading）开始放映，并对第一页设置6s的自动换页时间。**
### 2.2 谱面文件
在插件目录的`nginx\html\chartfile`文件夹下放入zip压缩包格式的谱面文件，并在`list.json`中**参照已给出的3个示例**按格式添加谱面信息。**注意：** 谱面文件必须为zip压缩包格式，**不可以为文件夹**，否则将无法加载。**谱面记忆加载功能和该文件的填写顺序相关，请认真填写。** *试一试就知道了oh~*

```json
{
    "0": {
        "name": "-请选择谱面文件-",
        "path": ""
    },
//请勿更改以上字段！
    "1": {   
// "0""1"等请按顺序填写数字。 
        "name": "测试spa谱面", 
// name字段填写谱面名字，供下拉列表显示用。
        "path": "/chartfile/测试spa谱面.zip"
// path字段填写谱面文件相对于“html”文件夹的路径（即谱面文件在服务器上的相对路径），如上所示。需要验证请在前方添加https://127.0.0.1:2085后在浏览器访问，若不报404等错误即配置成功。建议放置于“chartfile”文件夹下，方便配置。
    },
    。。。
}
```
(请在复制以上内容到文件时删除以`//`开头的标红注释行！)

## 3. 使用
0. 运行“phi，启动！.bat”以启动服务端。
1. 在编辑环境下，选择第二页并选中加载项，下滑（滚动页面），此时会显示一个绿色的“设置”按钮，点击则会显示“更多设置”。
2. 在“-请选择谱面文件-”处选择需要加载的谱面，并等待加载完成。
3. 按需修改下方设置选项，建议选中“音画实时同步(若声音卡顿则建议关闭)”和“隐藏距离较远的音符”。
4. **保存文档**，然后按照  “若需要配合其他PPT文件使用，请链接到**第二张（加载项）** PPT，无需设置任何自动换页时间；若直接放映，请从**第一页（Loading）开始放映，并对第一页设置6s的自动换页时间。**”  的说明，放映PPT并开始使用吧！
5. 用完后运行“关闭服务端.bat”以关闭服务端。

## 4. 注意事项
1. **请在谱面开始播放前狂击屏幕，否则所有声音将不会自动播放（webview安全限制）。**
2. **由于PPT限制，非Ipad系统使用该插件无法使用触屏打歌，请谅解。** *微软屏蔽了非Ipad平台等不可（只）使用触摸屏的平台加载项内的触摸事件。*
3. **若第一次在下拉列表内选择了错误的谱面，后续配置完，在使用前需要点击右上角出现的“[个性菜单](https://learn.microsoft.com/zh-cn/office/dev/add-ins/design/content-add-ins#personality-menu)”并在跳出的菜单内选择“重新加载”以重新加载插件，否则无法加载正确的谱面。**
4. 若需要重置设置，请选中最下方的“恢复默认设置(刷新生效)”复选框，并参照上一条重新加载插件+保存文档。
5. **最为重要！！！在编辑状态下修改插件设置等同于修改PPT，需要保存！** 放映状态下无需保存。

# 其他
## 更新日志

每个版本的详细更改都记录在 [CHANGELOG.md](CHANGELOG.md) 中。

## 许可证

本项目源码按 [GPL-3.0](LICENSE.txt) 协议开源；不鼓励、不支持一切商业用途。

本项目不提供本体安装包及逆向工具/教程，~~也不提供谱面下载。~~ 项目设计原因，必须提供谱面防止程序出错，若对您造成影响，请 [联系 Html5syt](mailto:html5syt@163.com?subject=[GitHub]html5syt/sim-phi-Office) 。

模拟器代码部分为 [lchz&#104;3473](https://space.bilibili.com/274753872) (以下简称 lchz&#104;) 独立编写，Office插件代码部分为 [Html5syt](https://space.bilibili.com/1172199422) 独立编写，与本体无关；

您因使用或修改代码所造成的一切后果由您自己承担；

如有任何疑问请 [联系 lchz&#104;](mailto:lchz%683%3473@163.com?subject=[GitHub]lchz%683%3473/sim-phi)或[联系 Html5syt](mailto:html5syt@163.com?subject=[GitHub]html5syt/sim-phi-Office) 。

Copyright &copy; 2020-present, lchz&#104;3473

> To lchzh3473: 请遵守GPL协议！别想着每天在B站搞举报这种下三滥的事情！

