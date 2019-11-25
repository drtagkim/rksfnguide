//set_date.js
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
chrome.storage.sync.get("timing1",(data)=>{
    let timing1=data.timing1;
    chrome.storage.sync.get(["startDate","endDate","currentDateLog"],(data)=>{
        setTimeout(()=>{
            let sd=data.startDate;
            let ed=data.endDate;
            let currentDateLog=data.currentDateLog;
            console.log(currentDateLog); //test
            var listDate = [];
            getDateRange(sd,ed,listDate);
            var date_input=document.querySelector("#tab1DateSingle");
            date_input.value=listDate[currentDateLog];
            chrome.storage.sync.set({currentDateLog:++currentDateLog});
        },timing1);
    });
    
});




