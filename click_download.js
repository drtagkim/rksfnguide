//click_download.js
chrome.storage.sync.get(["timing1","timing2","timing3"],(data)=>{
    var download=document.querySelector("#btnTab1Excel");
    let timing1=data.timing1;
    let timing2=data.timing2;
    let timing3=data.timing3;
    let sleeping=timing1+timing2+timing3;
    setTimeout(()=>{
        download.click();
        console.log("file downloading.");
    },sleeping);
});
