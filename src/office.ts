import { mainPlay } from "@/index";
///<reference path="../public/utils/dist/office.d.ts" />

var playFlag = 0
var activeview = 0
var int: NodeJS.Timeout

// 入口函数
export function init() {
    console.log("office.ts inited");
}

// phi，启动！
Office.initialize = function () {
    registerActiveViewChanged();
    checkViewF();
}


// 加载谱面。。。
async function loading() {

    const goToFirst = Office.Index.First;

    Office.context.document.goToByIdAsync(goToFirst, Office.GoToType.Index, function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            console.error(asyncResult.error.message);
        }
        else {
            setTimeout(gotonext, 6000)
        }
    });

    async function gotonext() {
        const goToNext = Office.Index.Next;

        Office.context.document.goToByIdAsync(goToNext, Office.GoToType.Index, function (asyncResult) {
            if (asyncResult.status == Office.AsyncResultStatus.Failed) {
                console.error(asyncResult.error.message);
            }
            else {
                mainPlay();
                // main.error('测试。。。');
                playFlag = 1
            }
        });
    }

}



// // 检查当前视图
function checkViewF() {
    Office.context.document.getActiveViewAsync(
        function (asyncResult) {
            if (asyncResult.status == Office.AsyncResultStatus.Failed) {
                console.log("[office] Action failed with error: " + asyncResult.error.message);
            }
            // 应对直接开启幻灯片放映
            else if (asyncResult.value == "read" && playFlag == 0) {
                loading()
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
        else if (asyncResult.value.slides[0].index == 2 && playFlag == 0 && activeview == 1) {
            {
                mainPlay();
                playFlag = 1
                setInt(0)
            }
        }
    });
}

// 设置定时器
async function setInt(flag: number) {
    if (flag == 1) {
        int = setInterval(checkView, 500)
    }
    else if (flag == 0) {
        //@ts-ignore
        clearInterval(int)
    }
}



// 活动视图改变处理函数
async function activeViewHandler(eventArgs: any) {
    if (eventArgs.activeView == "edit") {
        mainPlay();
        playFlag = 0
        activeview = 0
        setInt(0)
    }
    else if (eventArgs.activeView == "read") {
        // 加载谱面时间
        setInt(1)
        activeview = 1
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
                console.log("[office] activeview changed handler registered", asyncResult.status);
            }
        });
}