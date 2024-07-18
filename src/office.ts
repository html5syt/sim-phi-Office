import {mainPlay} from "@/index";
///<reference path="../public/utils/dist/office.d.ts" />


var playFlag=0
var activeview=0
// 入口函数
export function init() {
    // console.log(`Office.js is now ready in ${info.host} on ${info.platform} !!!`);
    console.log("office.ts inited");
    // setInterval(checkView, 1000)
}

function checkViewF() {
    Office.context.document.getActiveViewAsync(
        function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            console.log("[office] Action failed with error: " + asyncResult.error.message);
        }
        // else if (asyncResult.value == "edit" && playFlag==1){
        //     // console.log('playflag11:'+playFlag)
        //     mainPlay();
        //     playFlag=0;
        //     activeview=0
        //     // console.log('playflag12:'+playFlag)
        // }
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

//general Office.initialize function. Fires on load of the add-in.
Office.initialize = function(){

    //Gets whether the current view is edit or read.
    // const currentView = getActiveFileView();

    //register for the active view changed handler

    registerActiveViewChanged();

        checkViewF();
    
    //render the content based off of the currentView
    //....
}

// 通用暂停
// function sleep(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
  

function checkView() {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.SlideRange, (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.error(asyncResult.error.message);
        }
        // @ts-ignore
        else  if (asyncResult.value.slides[0].index == 2 && playFlag==0 && activeview==1){
            // const jsonString = asyncResult.value ;
              
            // const slide = JSON.parse(jsonString);

           {
            mainPlay();
            playFlag=1
            setInt(0)
        }
        }
    });
}
  

var int: NodeJS.Timeout

async function setInt(flag:number) {
    if (flag==1){
        int=setInterval(checkView, 500)
    }
    else if(flag==0){
        //@ts-ignore
        clearInterval(int)
    }
}

async function activeViewHandler(eventArgs: any) {
        if (eventArgs.activeView == "edit"){
            // console.log('playflag11:'+playFlag)
            mainPlay();
            playFlag=0
            activeview=0
            setInt(0)
            // console.log('playflag12:'+playFlag)
        }
        else if(eventArgs.activeView == "read"){
            // console.log('playflag21:'+playFlag)
            setInt(1)
            activeview=1
            // console.log('playflag22:'+playFlag)
        }
}

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