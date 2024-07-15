import {mainPlay} from "@/index";
///<reference path="../public/utils/dist/office.d.ts" />




// 入口函数
export function init() {
    // console.log(`Office.js is now ready in ${info.host} on ${info.platform} !!!`);
    console.log("office.ts inited");
    // setInterval(checkView, 1000)
}



//general Office.initialize function. Fires on load of the add-in.
Office.initialize = function(){

    //Gets whether the current view is edit or read.
    // const currentView = getActiveFileView();

    //register for the active view changed handler

    registerActiveViewChanged();
    //render the content based off of the currentView
    //....
}



function activeViewHandler(eventArgs: any) {
        if (eventArgs.activeView == "edit"){
            // console.log('playflag11:'+playFlag)
            mainPlay();

            // console.log('playflag12:'+playFlag)
        }
        else if(eventArgs.activeView == "read"){
            // console.log('playflag21:'+playFlag)
            mainPlay();

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