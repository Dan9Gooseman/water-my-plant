


const socket = io();
const list = document.getElementById("wifi-list");
const chartCtx = document.getElementById("wifi-chart").getContext("2d");

const labels = [];
const rssiData = [];

const chart = new Chart(chartCtx, {
    type: "line",
    data : {
        labels,
        datasets: [{
            label: "RSSI",
            data: rssiData,
            borderColor: "blue",
            fill:false,
        }]
    },
    options: {
        scales: {
            x: {display:false},
            y: {beginAtZero:false},
        }
    }
})

//Dữ liệu ban đầu
socket.on("initial-data", (data) => {
    data.forEach(d => addData(d));
})

function addData(data) {
    const item = document.createElement("li");
    item.innerText = `[${new Date(data.time).toLocaleTimeString()}] | SSID: ${data.ssid} | RSSI: ${data.rssi}}]`;
    list.prepend(item);

    if (list.children.length > 50) list.removeChild(list.lastChild);

    labels.push(new Date(date.time).toLocaleTimeString());
    rssiData.push(data.rssi);
    if (labels.length > 50) {
        labels.shift();
        rssiData.shift();
    }
    chart.update();
}   