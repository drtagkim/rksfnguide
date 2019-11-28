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
    let sd="2019-10-01";
    let ed="2019-10-03";
    let listDate = [];
    getDateRange(sd,ed,listDate);
    chrome.storage.sync.set({
        startDate:sd,
        endDate:ed,
        currentDateLog:0,
        timing1:1000,
        timing2:1000,
        timing3:5000
    });
    console.log(`Installation complete.`);
});
//
function doit(isfirst) {
    chrome.storage.sync.get(["currentDateLog","startDate","endDate"],(data)=>{
        let listDate = [];
        let sd=data.startDate;
        let ed=data.endDate;
        getDateRange(sd,ed,listDate);        
        let i=data.currentDateLog;
        let n=listDate.length;
        if(i<n) {
            if(isfirst) {
                console.log("Fire first.");
            } else {
                console.log(`Fire another (${i+1}/${n}).`);
            }
            
            chrome.tabs.query({
                active:true,
                currentWindow:true
            },(tabs)=>{
                chrome.tabs.executeScript({file:'js/set_date.js'});
                chrome.tabs.executeScript({file:'js/click_search.js'});
                chrome.tabs.executeScript({file:'js/click_download.js'});
            });
        } else {
            console.log("Complete.");
        }
    });
}
chrome.browserAction.onClicked.addListener(()=>{
    chrome.storage.sync.set({currentDateLog:0});
    doit(true);
});
chrome.downloads.onChanged.addListener((d)=>{
    if('state' in d && d.state.current==='complete') {
        doit(false);
    }
});
chrome.downloads.onDeterminingFilename.addListener(function(item,__suggest) {
    chrome.storage.sync.get(["currentDateLog","startDate","endDate"],(data)=>{
        let listDate = [];
        let sd=data.startDate;
        let ed=data.endDate;
        getDateRange(sd,ed,listDate);
        let d=listDate[--data.currentDateLog];
        let new_filename=`${d}.xls`;
        //console.log(chrome.runtime.lastError);
        __suggest({filename:new_filename},"uniquify");

    });
    return true;
});