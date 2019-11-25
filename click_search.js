//click_search.js
chrome.storage.sync.get(["timing1","timing2"],(data)=>{
    var search=document.querySelector("#btnTab1Submit");
    let timing1=data.timing1;
    let timing2=data.timing2;
    let sleeping=timing1+timing2;
    setTimeout(()=>{
        search.click();
        console.log("search clicked.");
    },sleeping);
});
