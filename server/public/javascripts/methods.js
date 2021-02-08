function getTime(){
    var date = new Date()
    var year =date.getFullYear()
    var month =date.getMonth()+1
    var day =date.getDate()
    var hour =date.getHours()
    var min =date.getMinutes()
    console.log(date);
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(time);
    console.log(min);
    return year+"/"+month+"/"+day+"at"+ hour+":"+min
}
function getTime(){
    var date = new Date()
    var year =date.getFullYear()
    var month =date.getMonth()+1
    var day =date.getDate()
    var hour =date.getHours()
    var min =date.getMinutes()
    console.log(date);
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(time);
    console.log(min);
    return year+"/"+month+"/"+day+"at"+ hour+":"+min
}
module.exports ={
    getTime
}