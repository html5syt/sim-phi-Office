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

export function setSetting(name:string,value:any) {
    Office.context.document.settings.set(name, value);
    Office.context.document.settings.saveAsync( (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.error(asyncResult.error.message);
        }
        // @ts-ignore
        else{
            console.log("[office] set setting success")
        }
    });
}

export function rmSetting(all: boolean = false, name: string) { 
    if (all) {
        // re: 统计所有用到的设置名！
        Office.context.document.settings.remove('mySetting');
    }
    else {
        Office.context.document.settings.remove(name);
    }
}

// Office.context.document.settings.get('mySetting')





// 设置谱面文件列表
function setSelect() {

// 假设list.json位于您的服务器上，或者您可以通过相对路径或绝对URL访问它  
const jsonUrl = '/chartfile/list.json';  
  
// 使用fetch异步加载JSON文件  
fetch(jsonUrl)  
  .then(response => {  
    if (!response.ok) {  
        throw new Error('谱面JSON路径文件读取错误，请检查文件是否存在！');  
    }  
    return response.json(); // 解析JSON响应  
  })  
  .then(data => {  
    // 假设data现在包含了从list.json加载的对象  
    const chartlist = data as { [key: string]: { name: string, path: string } };  
  
    // 创建两个列表  
    const chartFileName: string[] = [];  
    const chartFilePath: string[] = [];  
  
    // 遍历chartlist对象  
    for (const key in chartlist) {  
        if (chartlist.hasOwnProperty(key)) { // 确保属性是对象自身的属性，而不是继承的  
            const item = chartlist[key];  
            chartFileName.push(item.name);  
            chartFilePath.push(item.path);  
        }  
    }  
  
// 假设这是从某处获取的列表  

  
// 确保这两个列表的长度相同  
if (chartFileName.length !== chartFilePath.length) {  
    throw new Error("chartFileName和chartFilePath的项数必须相同，请检查JSON配置！");  
}  
  
// 获取select元素  
const selectChartFile = document.getElementById('selectChartFile') as HTMLSelectElement;  
  
// 清除select元素中现有的所有option（如果有的话）  
selectChartFile.innerHTML = '';  
  
// 遍历列表并添加option元素  
chartFileName.forEach((name, index) => {  
    const option = document.createElement('option');  
    option.value = chartFilePath[index]; // 设置value为对应的文件路径  
    option.text = name; // 设置显示的文本为文件名  
    selectChartFile.appendChild(option); // 将option添加到select中  
});  
  
// 添加事件监听器以处理选项改变  
selectChartFile.addEventListener('change', () => {  
    // 获取所选option的value（即文件路径）  
    const selectedValue = selectChartFile.value;  
    // 调用setChart函数并传入所选的value  
    setChart(selectedValue);  
});  
  



  })  
  .catch(error => {  
    console.error('Error fetching or parsing JSON:', error);  
  });
}


// 假设的setChart函数  
function setChart(value: string) {  
    console.log('Selected chart:', value);  
    // 在这里可以添加更多的逻辑，比如加载图表等  
}


setSelect();