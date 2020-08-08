const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();

//Define Path for express configuration
const viewPath=path.join(__dirname,'../templates/views');
const publicDirectory=path.join(__dirname,'../public');
const partialPath=path.join(__dirname,'../templates/partials');
//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);
//Setup used for the static routing
app.use(express.static(publicDirectory));

app.get('',(req,res)=>{
    res.render('index',{title:'Weather',
    name:'Sahil Mishra'});
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sahil Mishra'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',helptext:'Help yourself by exploring!',name:'Sahil Mishra'})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error:'You must provide an address!'})
    }
    
    geocode(req.query.address, (error,{ latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast( latitude, longitude, (error,forecastData)=>{
            if(error){
               return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
     })   
    

})

app.get('/help/*',(req,res)=>{
    res.render('404',{title:'404',errormessage:'Help Page not Found',name:'Sahil Mishra'
                })
})

app.get('*',(req,res)=>{
    res.render('404',{title:'404',errormessage:'Page not found',name:'Sahil Mishra'})
})

app.listen(3000,()=>{
    console.log('Server is set up on port 3000');
})