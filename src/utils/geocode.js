const request=require('request');

const geocode=(address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FoaWxtaXNocmEiLCJhIjoiY2tkaDVraWkwMWs3dzJzcXFoeDBudGlmbyJ9.5Sz4luinLsUpymNNzXNGOg&limit=1';

request({url,json:true},(error,{body}={})=>{
    if(error){
        callback('Unable to connect with Location Services',undefined);
    }
    else if(body.features.length==0){
        callback('Unable to find Location! Please add new Location ',undefined);
    }
    else{
        callback(undefined,{location:body.features[0].place_name,
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0]})
    }
})
}

module.exports=geocode;