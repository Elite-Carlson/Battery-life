const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const progress = document.querySelector('.progress');
const percentage = document.querySelector('.percentage');
const batterystatus = document.querySelector('.batterystatus');

//Clock
function timeupdate() {
    var datetime = new Date();
    var currentHour = datetime.getHours();
    var currentMinute = datetime.getMinutes();
    hour.textContent = currentHour;
    minute.textContent = currentMinute;
    if (currentMinute <= 9) {
        minute.textContent = "0"+currentMinute;
    }else {
        minute.textContent = currentMinute;
    }      
}   
setInterval(timeupdate, 1000);

//Extension infographics
navigator.getBattery().then((battery) => {
    function updateLevelInfo2(){
        if (Math.round(battery.level * 100) == 83) {
            notify();//Notifying
        }
        percentage.innerHTML = Math.round(battery.level * 100);
        progress.style.background = `conic-gradient(rgb(255, 255, 255) ${Math.round(battery.level * 100) * 3.6}deg,rgba(255, 255, 255, 0.137) 0deg)`;
    }
    function updateChargeInfo2(){
        if (battery.charging == true) {
            batterystatus.innerHTML = "Charging..";
        } else {
            batterystatus.innerHTML = "Unplugged";
        }
    }
    updateLevelInfo2();
    updateChargeInfo2();
    battery.addEventListener('levelchange', updateLevelInfo2);
    battery.addEventListener('chargingchange', updateChargeInfo2);
    
    function notify(){
        chrome.notifications.create(
            {
                title: "Battery life",
                message: `It's time to unplag buddy your at ` + Math.round(battery.level) * 100 +'%',
                iconUrl: "48.png",
                type: "basic"
            }
        )
    }
});

//Push Notifications
// function notifier(){
//         Notification.requestPermission().then(permission => {
//         notify();
//         });
// }
// function notify(){    
//     navigator.getBattery().then((battery) => {
//         function updateAllBatteryInfo(){
//             updateChargeInfo();
//             updateLevelInfo();
//         }
//         updateAllBatteryInfo();
//         function updateChargeInfo(){
//             // console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
//         }
//         function updateLevelInfo(){
//             if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//                 var iconimg = 'charginglight.png';
//             }else{
//                 var iconimg = 'chargingdark.png';
//             }
//             if (!("Notification" in window)) {
//                 alert("This browser does not support desktop notification");
//             } else if (Notification.permission === "granted") {
//               new Notification('Battery Life',{
//                 body: `It's time to unplag buddy your at ` + battery.level * 100 +'%',
//                 icon: iconimg,
//                 requireInteraction: true
//             });
//             } else if (Notification.permission !== "denied") {
//                 Notification.requestPermission().then((permission) => {
//                     if (permission === "granted") {
//                       new Notification('Time to Unplag',{
//                         body: 'Battery level:' + battery.level * 100,
//                         icon: iconimg,
//                         requireInteraction: true
//                     });
//                 }
//             });
//             }
//             // console.log(`Battery level: ${battery.level * 100}%`);
//         }
        // battery.addEventListener('levelchange', updateLevelInfo);
        // battery.addEventListener('chargingchange', updateChargeInfo);
//     });
// }