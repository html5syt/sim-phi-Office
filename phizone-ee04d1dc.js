const t=hook.define({name:"PhiZone",description:"PhiZone API",contents:[{type:"command",meta:["/pz",async function(t){const a=t||i("请输入歌曲ID");if(""===a||null===a)return void b("未输入歌曲ID，已取消操作");const c=await async function(t){e("等待服务器响应...");const a=await fetch(r(0|t));if(!a.ok)throw new Error(`${a.status} ${a.statusText}`);const c=((await a.json()).data||[])[0];if(!c)return{charts:[]};const n=await fetch(o(c.id));if(!n.ok)throw new Error(`${n.status} ${n.statusText}`);return l(((await n.json()).data||[]).filter((t=>t.file)),c)}(a).catch(u);if(console.log(c),c){if(!c.charts.length)return void h(a);await w(c)}}]},{type:"command",meta:["/pzc",async function(t){const a=t||i("请输入谱面ID");if(""===a||null===a)return void b("未输入谱面ID，已取消操作");const c=await async function(t){e("等待服务器响应...");const a=await fetch(s(0|t));if(!a.ok)throw new Error(`${a.status} ${a.statusText}`);const c=((await a.json()).data||[])[0];if(!c||!c.file)return{charts:[]};const r=await fetch(n(c.songId));if(!r.ok)throw new Error(`${r.status} ${r.statusText}`);return l([c],(await r.json()).data)}(a).catch(u);if(console.log(c),c){if(!c.charts.length)return void h(a);await w(c)}}]},{type:"command",meta:["/random",async function(){const t=await async function(){e("等待服务器响应...");const t=await fetch(f());if(!t.ok)throw new Error(`${t.status} ${t.statusText}`);const a=(await t.json()).data,c=await fetch(n(a.songId));if(!c.ok)throw new Error(`${c.status} ${c.statusText}`);return l([a],(await c.json()).data)}().catch(u);if(console.log(t),t){if(!t.charts.length)return void h("<random>");await w(t)}}]}]}),{sendText:e,uploader:a}=hook,c="https://api.phizone.cn",n=(t="")=>`${c}/songs/${t}/`,r=(t=0)=>`${c}/songs/?perpage=1&page=${t}`,s=(t=0)=>`${c}/charts/?perpage=1&page=${t}`,o=(t="")=>`${c}/songs/${t}/charts/`,f=()=>`${c}/charts/random/?rangeFormat=0&rangeFormat=1`,d="PhiZone API v0.8.4",i=t=>prompt(`${d}\n${t}`),b=t=>hook.toast(`${d}\n${t}`),u=t=>{b(`无法连接至服务器\n错误代码：${t.message}`),e("无法连接至服务器")},h=t=>{b(`歌曲ID ${t} 对应的谱面不存在`),e(`歌曲ID ${t} 对应的谱面不存在`)};function l(t,e){return console.log("getData::base",...t),console.log("getData::song",e),{charts:t.map((t=>({id:t.id,chart:t.file,level:`${t.level} Lv.${0|t.difficulty}`,charter:t.authorName.replace(/\[PZUser:\d+:([^\]]+?)(:PZRT)?\]/g,"$1"),assets:t.assets}))),composer:e.authorName,illustration:e.illustration,illustrator:e.illustrator,name:e.title,song:e.file}}async function w(t){const{charts:c}=t,n=[t.song,t.illustration];for(const t of c)t.chart&&n.push(t.chart),t.assets&&n.push(t.assets);const r=new g,s=t=>decodeURIComponent(t.match(/[^/]+$/)[0]);e("获取资源列表..."),await r.add(n,(({url:t,status:e,statusText:a})=>{b(`资源 '${s(t)}' 加载失败\n错误代码：${e} ${a}`)})),await r.start(a.fireProgress.bind(a));const o=async(t,e)=>{const c=await r.getData(t)||new ArrayBuffer(0);a.fireLoad({name:e},c)};await o(t.song,s(t.song)),await o(t.illustration,s(t.illustration));for(let e=0;e<c.length;e++){const n=c[e];n.assets&&await o(n.assets,s(n.assets)),await o(n.chart,s(n.chart));const r=new TextEncoder,f=p(n.id),d=`\n      #\n      Name: ${t.name}\n      Song: ${s(t.song)}\n      Picture: ${s(t.illustration)}\n      Chart: ${s(n.chart)}\n      Level: ${n.level}\n      Composer: ${t.composer}\n      Charter: ${n.charter}\n      Illustrator: ${t.illustrator}\n      Offset: ${f}\n    `,i=r.encode(d);a.fireLoad({name:"info.txt"},i.buffer)}}function g(){this.xhrs=Object.create(null)}function p(t){return"67b8c0fd-4879-41e3-af04-6dc8f41ddcd1"===t?200:"2eb9e940-4350-4509-a244-068abd937f44"===t?-50:"026c8905-6f24-421c-a594-e5f9bf1d053a"===t?150:"71acb2d4-225e-4b0a-989c-660f4c075542"===t?175:"165119b8-7074-4106-bb23-27a8fb99c0c6"===t?150:"846587d2-0ff2-40ca-b42b-3568cef08e48"===t?-25:"74585cab-6b6f-4633-9c3d-4dfa9900cafd"===t?75:"8c4d638a-a1aa-4e29-a0d2-2f3a2cb7e69c"===t?300:"c4dc62c4-7bed-4f39-b6ed-451ecdcb9b6b"===t?250:"f0b1e2eb-f7f8-42ec-bcb3-6a717147ad4e"===t?225:"d7ad0802-22e1-4efc-8bba-4cfe074d2a95"===t?200:"7be304a2-74cc-48a7-80bb-98de40cd814d"===t?-25:"11eae627-ff9e-48fe-8c9f-2d49d6e34221"===t?-100:"18686678-cd3b-493e-accb-c6ca0bc304c5"===t?-50:"0ebddbc4-ff08-4484-8f21-bd0295526bdc"===t?50:"430a4ff2-e9e2-4add-9ee4-fbc172367e5d"===t?200:"260d12cf-847a-4773-aaf0-b754753f5596"===t||"e5e9021d-9254-408d-8629-795849f51732"===t?75:"9d01431f-7c81-4fb5-a9a4-5f5ef4e07cd3"===t?175:"1476dcb7-37c8-4f97-b039-7e07a8583078"===t||"2b8217af-3c7b-44b2-a9c9-fe869ea17c07"===t?50:"e7ab7d3b-1be4-4300-b9d6-63814faa381c"===t?150:"a7b12a21-cb2c-4e79-9260-2cc3323752df"===t?-400:"39a834ed-7310-46ac-99e4-577cde527a84"===t?-150:"da8533af-9767-47b0-87c0-c12684e02980"===t?-1450:"97e22151-1cb8-4c48-8af4-c3419ed6b9ce"===t?175:"8d3c6775-9091-45bd-b6ff-d556cf36e85f"===t?-350:"336b6099-61c1-403b-b226-483afc4a7bec"===t?25:"b788d213-58e1-448f-8412-cebe8c8df12a"===t||"04181380-bdcf-40f3-8ec7-68a23ad84ba3"===t?50:"594e3208-8459-48ae-88e8-b11823e5c2ad"===t?250:"84f0ce5f-b894-4db6-b042-b31232c62d0c"===t?-150:"920506fb-2c52-4d17-b7e7-d8f1fe6afde5"===t?225:"d12f18e4-ca64-4781-97ee-a7d922c831cf"===t?50:"70c543f8-97c5-4a2d-82ff-17efc484d52f"===t?400:"fb716191-ffb4-462b-b92d-85c86f94833e"===t?-200:"b15f2eb5-d9c1-40f7-9bc8-4ccbc69229c6"===t?200:"a837eea9-b4a3-4c77-b7e5-757f4e940307"===t?150:"710750c5-3728-46b8-bfb2-f895f1f909c0"===t?350:"0108b4f0-d3ee-47a0-b6a1-bddcfad8f54d"===t?400:"fbd4ca74-40c3-4c9f-9415-729f47d537fb"===t||"0a42b7b5-8a25-4438-b221-c9c0e585f27c"===t?-25:"e59e5ef8-d444-4dc6-aebe-44bfd4891a94"===t?-50:"c2006c12-e1c2-47ba-8292-c6c00b37dfbf"===t||"2b0338d9-e71a-40fe-8d79-dc8f6dec48da"===t?50:0}g.prototype.add=function(t=[],e=(t=>{})){return Promise.all(t.filter((t=>!this.xhrs[t])).map((async t=>{try{const e=await async function(t){try{const e=await fetch(t,{method:"HEAD"}).catch((()=>{throw Object.assign(new Error,{url:t,status:0,statusText:"Network Error"})})),a=e.headers.get("content-length");if(null==a)throw new Error("No Content-Length Header");if(e.ok)return Number(a)}catch{const e=await fetch(t,{method:"GET"}).catch((()=>{throw Object.assign(new Error,{url:t,status:0,statusText:"Network Error"})}));if(e.body.cancel(),!e.ok)throw Object.assign(new Error,{url:t,status:e.status,statusText:e.statusText});return Number(e.headers.get("content-length"))||0}throw Object.assign(new Error,{url:t,status:0,statusText:"Unknown Error"})}(t);this.xhrs[t]={event:{loaded:0,total:e}}}catch(t){e(t)}})))},g.prototype.start=function(t=((...t)=>{})){const e=Object.entries(this.xhrs);return Promise.all(e.map((([e,a])=>function(t,e=(t=>{})){return new Promise(((a,c)=>{const n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="arraybuffer",n.onprogress=e,n.onload=t=>(200===n.status?a:c)(t),n.onerror=c,n.send()}))}(e,(e=>{a.event=e,t(this.loaded,this.total)})).then((t=>a.event=t)).catch((t=>a.event=t)))))},g.prototype.getData=function(t){if(!this.xhrs[t])return null;const{event:e}=this.xhrs[t];return e.loaded>=e.total?e.target.response:null},Object.defineProperty(g.prototype,"loaded",{get(){return Object.values(this.xhrs).reduce(((t,e)=>t+e.event.loaded),0)}}),Object.defineProperty(g.prototype,"total",{get(){return Object.values(this.xhrs).reduce(((t,e)=>t+Math.max(e.event.loaded,e.event.total)),0)}});export{t as default};
//# sourceMappingURL=phizone-ee04d1dc.js.map