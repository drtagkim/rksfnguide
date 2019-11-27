//options.js
const sd=document.querySelector("#sd");
const ed=document.querySelector("#ed");
const update=document.querySelector("#update");
chrome.storage.sync.get(['startDate','endDate'],(data)=>{
    sd.value=data.startDate;
    ed.value=data.endDate;
});
//
update.addEventListener("click",(e)=>{
    chrome.storage.sync.set({
        startDate:sd.value,
        endDate:ed.value,
        currentDateLog:0
    },()=>{
        let msg=$("#msg");
        msg.text("Information updated.");
        msg.fadeOut(1000,function(){location.reload()});
    });
});
