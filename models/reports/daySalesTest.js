var fs = require('fs');
daySales = {
getpathproyect:function(todelete)
{
  actualdir = __dirname
  actualdir = actualdir.replace(todelete,'');
  return actualdir;
},

convertdatetoformatofso:function(date)
{
  return new Date(date);
},

devolvertodo:function(date)
{
  dir= getpathproyect('\\views\\reports');
  fs.readFile(dir+'/bd/sales.json', function (err, sales) {
    if (err) throw err;
    var general_list_of_sales = eval('(' + sales + ')');
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var result = [];
    for (i = 0; i < general_list_of_sales.length; i++) {
      var aux = convertdatetoformatofso(general_list_of_sales[i].date);
      if(aux.getDate() == day && aux.getMonth() == month && aux.getFullYear() == year)
      {
        result.push(general_list_of_sales[i]);
      }
    }
    for (var cont = 0; cont < result.length; cont++) {
      var aux1 = convertdatetoformatofso(result[cont].date);
      for (var cont1 = cont + 1; cont1 < result.length; cont1++) {
        var aux2 = convertdatetoformatofso(result[cont1].date);
        if(thehighttime(aux1,aux2))
        {
          var extra = result[cont];
          result[cont] = result[cont1];
          result[cont1] = extra;
        }
      }
    }
    var data_table = $("#tblDatos");
      for (var cont = 0; cont < result.length; cont++) {
        var aux = convertdatetoformatofso(result[cont].date);
        data_table.append("<tr> <td>" + getactualtime(aux) + "</td> <td>" + result[cont].id + "</td> <td>" + result[cont].total + "</td></tr>");
      }
  });
},


thehighttime:function(time1,time2)
{
  var aux1 = time1.getHours();
  var aux2 = time2.getHours();
  if(aux2 < aux1)
  {
    return true;
  }
  var aux1 = time1.getMinutes();
  var aux2 = time2.getMinutes();
  if(aux2 < aux1)
  {
    return true;
  }
  var aux1 = time1.getSeconds();
  var aux2 = time2.getSeconds();
  if(aux2 < aux1)
  {
    return true;
  }
  else {
    return false;
  }
},

getactualdate:function(date)
{
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var result = day+"/"+month+"/"+year;
  return result;

},

getactualtime:function(date)
{
  var minuts = date.getMinutes();
  var hours = date.getHours();
  var seconds = date.getSeconds();
  var result = hours+":"+minuts+":"+seconds;
  return result;
}
}

module.exports = daySales;
