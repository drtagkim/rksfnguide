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
        timing2:2000,
        timing3:5000,
        date_range:listDate
    });
    console.log(`Installation complete.`);
});
//
function doit() {
    chrome.storage.sync.get(["currentDateLog","date_range"],(data)=>{
        let i=data.currentDateLog;
        let n=data.date_range.length;
        if(i<n) {
            console.log(`Fire another (${i}/${n}).`);
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
    chrome.storage.sync.get(["startDate","endDate","timing1","timing2","timing3"],(data)=>{
        doit();
    });
});
chrome.downloads.onChanged.addListener((d)=>{
    if('state' in d && d.state.current==='complete') {
        doit();
    }
});
chrome.downloads.onDeterminingFilename.addListener(function(item,__suggest) {
    function suggest(filename,conflictAction) {
        __suggest({filename:filename,
            conflictAction:conflictAction,
            conflict_action:conflictAction});
    }
    chrome.storage.sync.get(["currentDateLog","date_range"],(data)=>{

        let d=data.date_range[--data.currentDateLog];
        let new_filename=`${d}_.xlsx`;
        //console.log(new_filename);
        suggest(new_filename,'overwrite');
    });
    return true;
});