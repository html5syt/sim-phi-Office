import {mainPlay,mainStop} from "@/index";
///<reference path="../public/utils/dist/office.d.ts" />


var playFlag=0;

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
    setInterval(run, 1000);
    //register for the active view changed handler

    registerActiveViewChanged();
    //render the content based off of the currentView
    //....
}



function activeViewHandler(eventArgs: any) {
        if (eventArgs.activeView == "edit" && playFlag==1){
            // console.log('playflag11:'+playFlag)
            mainStop();
            playFlag=0;
            // console.log('playflag12:'+playFlag)
        }
        else if(eventArgs.activeView == "read" && playFlag==0){
            // console.log('playflag21:'+playFlag)
            mainPlay();
            playFlag=1;
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

// This function displays the currently selected text in the console.
// It uses the Common APIs.
function run() {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.SlideRange, (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.error(asyncResult.error.message);
        } else {
            console.log("The selected data is ",JSON.stringify(asyncResult.value),".");
        }
    });
}