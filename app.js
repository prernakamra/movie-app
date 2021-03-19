//npm i nodemon
//nodemon => automate sart and stop a server when any change occur
//windows npx nodemon 
//npn i -g nodemon => install globally
//EJS => TEMPLATING LANGUAGES. inside html u can embeed any another code it might be python or any other language
// tempelating engine ejs
//in line 11 first paramenter is name of engine, second one is name of engine
const express = require('express')
const request=require('request')
const app=express()

//middlewares
app.set("view engine ","ejs")
app.use('/public',express.static('public'))
/* routing */
app.get('/dummy',(req,res)=>{
     //res.send('homepage from prerna kamra')
     res.render("dummy.ejs")
    })
app.get('/',(req,res)=>{
        //res.send('homepage from prerna kamra')
        res.render("home.ejs")
       })
   

app.get('/result',(req,res)=>{
    console.log(req.query)
    //res.send(`Your are search for ${req.query.moviename}`)
    const url=`http://www.omdbapi.com/?apikey=7b1b0854&s=${req.query.movieName}`
    request(url,function(error,response,body){
      if(!error && response.statusCode===200){
          const data = JSON.parse(body)
          //res.send(data)
          res.render('result.ejs',{moviesDump: data})

      }else{
          res.send('something  went wrong')
      }

    })
})
app.get('/result/:id',(req,res)=>{
    const url=`http://www.omdbapi.com/?apikey=7b1b0854&i=${req.params.id}`
    request(url,function(error,response,body){
      if(!error && response.statusCode===200){
          const data = JSON.parse(body)
          res.send(data)
          res.render('details.ejs',{data: data})

      }else{
          res.send('something  went wrong')
      }

    })

})
app.get('*',(req,res)=>{
    res.send("404 not find")
})

app.listen(3000,()=>{
    console.log("server has started")
})