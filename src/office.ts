import {mainPlay} from "@/index";
///<reference path="../public/utils/dist/office.d.ts" />

var playFlag=0
var activeview=0
var int: NodeJS.Timeout

// 入口函数
export function init() {
    console.log("office.ts inited");
}

Office.initialize = function(){
    registerActiveViewChanged();
    checkViewF();
}

// 检查当前视图
function checkViewF() {
    Office.context.document.getActiveViewAsync(
        function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            console.log("[office] Action failed with error: " + asyncResult.error.message);
        }
        // 应对直接开启幻灯片放映
        else if(asyncResult.value == "read" && playFlag==0){
            // console.log('playflag21:'+playFlag)
            mainPlay();
            playFlag=1;
            activeview=1
            // console.log('playflag22:'+playFlag)
        }
    });
}

// 检查当前选中的幻灯片
function checkView() {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.SlideRange, (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.error(asyncResult.error.message);
        }
        // @ts-ignore
        else  if (asyncResult.value.slides[0].index == 2 && playFlag==0 && activeview==1){
           {
            mainPlay();
            playFlag=1
            setInt(0)
        }
        }
    });
}

// 设置定时器
async function setInt(flag:number) {
    if (flag==1){
        int=setInterval(checkView, 500)
    }
    else if(flag==0){
        //@ts-ignore
        clearInterval(int)
    }
}

// 活动视图改变处理函数
async function activeViewHandler(eventArgs: any) {
        if (eventArgs.activeView == "edit"){
            mainPlay();
            playFlag=0
            activeview=0
            setInt(0)
        }
        else if(eventArgs.activeView == "read"){
            setInt(1)
            activeview=1
        }
}

// 注册活动视图改变事件
function registerActiveViewChanged() {
    Office.context.document.addHandlerAsync(Office.EventType.ActiveViewChanged, activeViewHandler,
        function (asyncResult) {
            if (asyncResult.status == Office.AsyncResultStatus.Failed) {
                console.log("[office] Action failed with error: " + asyncResult.error.message);
            }
            else {
                console.log("[office] activeview changed handler registered",asyncResult.status);
            }
        });
}