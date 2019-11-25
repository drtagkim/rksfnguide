//options.js
const sd=document.querySelector("#sd");
const ed=document.querySelector("#ed");
const update=document.querySelector("#update");
const wt=document.querySelector("#wt");
chrome.storage.sync.get(['startDate','endDate','waiting'],(data)=>{
    sd.value=data.startDate;
    ed.value=data.endDate;
    wt.value=Math.round(data.waiting/1000)
});
//
update.addEventListener("click",(e)=>{
    chrome.storage.sync.set({
        startDate:sd.value,
        endDate:ed.value,
        waiting:1000*parseInt(wt.value)
    },()=>{
        let msg=$("#msg");
        msg.text("Information updated.");
        msg.fadeOut(1000,function(){location.reload()});
    });
});