const PDFDocument = require("pdfkit");
const fs = require("fs");
const Table = require('../model/Table')
const winston = require('winston')
const Order = require('../model/Order')

function getTime(){
    var date = new Date()
    var year =date.getFullYear()
    var month =date.getMonth()+1
    var day =date.getDate()
    var hour =date.getHours()
    var min =date.getMinutes()
    var sec = date.getSeconds()
    return year+"_"+month+"_"+day+"at"+ hour+"_"+min+"_"+sec
}

function exportPdf(productName,tableSelect,code,points,lastPrice){
        const pdf = new PDFDocument({size:[300,700]});
        pdf.pipe(fs.createWriteStream("pdfExport/" + getTime()+ ".pdf"));
        pdf
            .fontSize(25)
            .text("MC Facture", { align: "center" })
            .text("********************************")
            .text("votre commande est : " + productName, { align: "left" })
            .text("**************")
            .text("Numero de table : " + tableSelect, { align: "left" })
            .text("**************")
            .text("votre code : " + code, { align: "left" })
            .text("**************")
            .text("votre pointes : " + points, { align: "left" })
            .text("**************")
            .text("Mt a payer  : " + lastPrice+" DH", { align: "left" })
            .text("**************")
       
        pdf.end();
}

function randomCode(min, max) {  
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

function getPoints(price){
    var pts =0;
    if(price>30 && price<45){
        pts = 1
    }else if(price>45 && price<70){
        pts = 2
    }
    else if(price>70){
        pts = 4
    }
    return pts
}

async function tableReserved(table){
    var tbl = await Table.findOneAndUpdate({tableNumber:table},{$set:{available:false}})
    return tbl
}
// async function makeOrder(body) {
//     var order = await 
// }
const logConfiguration = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "./logs/allLogs.log",
      }),
      new winston.transports.MongoDB({
          db : "mongodb://localhost/McBrief",
          options : { useUnifiedTopology: true },
      })
    ],
  };
  const loggger = winston.createLogger(logConfiguration);
function saveLog(message,lavel,link){
    var lg =  loggger.log({
          message: message,
          level: [lavel],
          Date: getTime(),
          http: "127.0.0.1:" + 3000 + "/"+link,
        });
      return lg
}
module.exports = {getTime,exportPdf,randomCode,getPoints,tableReserved,saveLog}
// export default {hello}