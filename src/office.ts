import {mainPlay} from "@/index";
///<reference path="../public/utils/dist/office.d.ts" />

var playFlag=0 //0=>未播放，1=>播放中

export function checkView() {
    Office.context.document.getActiveViewAsync(
        function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            console.log("[office] Action failed with error: " + asyncResult.error.message);
        }
        else if (asyncResult.value == "edit" && playFlag==1){
            // console.log('playflag11:'+playFlag)
            mainPlay();
            playFlag=0;
            // console.log('playflag12:'+playFlag)
        }
        else if(asyncResult.value == "read" && playFlag==0){
            // console.log('playflag21:'+playFlag)
            mainPlay();
            playFlag=1;
            // console.log('playflag22:'+playFlag)
        }
    });
}

