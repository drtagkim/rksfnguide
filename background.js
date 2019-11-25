//background.js
//
function getDateRange(startDate, endDate, listDate)
    {
        var dateMove = new Date(startDate);
        var strDate = startDate;
        var change_date_txt=function(dcode) {
            return dcode.replace(/-/g,".");
        };
        if (startDate == endDate)
        {
            var strDate = dateMove.toISOString().slice(0,10);
            listDate.push(change_date_txt(strDate));
        }
        else
        {
            while (strDate < endDate)
            {
                var strDate = dateMove.toISOString().slice(0, 10);
                listDate.push(change_date_txt(strDate));
                dateMove.setDate(dateMove.getDate() + 1);
            }
        }
        return listDate;
};

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({
        startDate:"2019-10-01",
        endDate:"2019-10-10",
        currentDateLog:0,
        timing1:500,
        timing2:1500,
        timing3:2000,
        waiting:20000
    });
});
//
function doit() {
    console.log("Activated.");
    chrome.tabs.query({
        active:true,
        currentWindow:true
    },(tabs)=>{
        chrome.tabs.executeScript({file:'js/set_date.js'});
        chrome.tabs.executeScript({file:'js/click_search.js'});
        chrome.tabs.executeScript({file:'js/click_download.js'});
    });
}
chrome.browserAction.onClicked.addListener(()=>{
    chrome.storage.sync.get(["startDate","endDate","timing1","timing2","timing3","waiting"],(data)=>{
        var listDate = [];
        let sd=data.startDate;
        let ed=data.endDate;
        let timing1=data.timing1;
        let timing2=data.timing2;
        let timing3=data.timing3;
        let waiting=data.waiting;
        getDateRange(sd,ed,listDate);
        let time_block=timing1+timing2+timing3+waiting;
        //console.log("list date: "+listDate);
        for(let i=0,n=listDate.length;i<n;++i) {
            if(i===0)  setTimeout(doit,0); //fire first
            setTimeout(doit,time_block*i);
            //console.log("fired.");
        }
    });
});
