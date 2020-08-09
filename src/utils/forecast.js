const request=require('request');

const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=52b7dd45d40b68c5320163999aba314c&query='+latitude+','+longitude+'&units=m';
request({url,json:true},(error,{body}={})=>{
if(error){
    callback('Unable to connect with forecast services',undefined);
}
else if(body.error){
    callback('Unable to find the Location please add new Location',undefined);
}
else{
    callback(undefined,body.current.weather_descriptions[0]+'! It is currently '+ body.current.temperature +' degrees out. It feels like '+body.current.feelslike+' degrees. The humidity is '+body.current.humidity+'%.');
}
});
}
module.exports=forecast;