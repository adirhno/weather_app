/** @format */

class Utilites {
 static filterData = function (data) {
    let card = {
      cityName: data.name,
      temp: data.main.temp,
      description: data.weather[0].main,
      icon: data.weather[0].icon,
      active:true
    };
    return card;
  };

  static toUpperCaseLetter=function(city){
    let cityNameUpperLetter =city[0].toUpperCase();
    let newCityName = city;
    newCityName= newCityName.slice(1);
    cityNameUpperLetter += newCityName;
    return cityNameUpperLetter
  }
}

module.exports = Utilites;
