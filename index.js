const express=require('express')
require('dotenv').config()

let app=express()
app.use(express.json())
let arr=[]
let id=0
app.get('/hii',(req,res)=>{
    try{
    res.send('<h1>check your system</h1>')
    }

catch(err){
    console.log(err)
    res.status(500).send({issuccessful: false, msg: "Server Error"})
}
})

app.get('/check',(req,res)=>{

})

app.put("/updateproduct",(req,res)=>{
    try{
    let id = req.query.id;
    let idx = arr.findIndex((val)=>(val.id == id));
    if(idx>=0){
        let obj = arr[idx]
        obj = {
            ...obj,
            ...req.body
        }
        arr[idx] = obj
        res.status(200).send({issuccessful : true, updateVal : obj})

    }
    else{
        res.status(404).send({issuccessful: false,msg:"product not verified"})
    }}
    catch(err){
        console.log(err)
        res.status(500).send({issuccessful: false, msg: "Server Error"})
    }   

})





app.post('/createprod',(req,res)=>{
    try{
    let obj=req.body;
    obj.isdelete = false;
    id++;
    obj.id=id;

    if(obj.name && obj.price && obj.category)
        {   
            let a=arr.find((val)=>{
                return val.name === obj.name

            })
            if (a==null){
            arr.push(obj)
       res.status(200).send({issuccessful : true , isdelete : false , product : obj})}
        else{
            res.send({issuccessful : false , msg : "product already exist"})
        }
    }
    
    else{
    res.send({issuccessful:false,msg:"product not valid"})



    
}}
    catch(err){
        console.log(err)
        res.status(500).send({issuccessful: false, msg: "Server Error"})
    }
})


app.delete('/deleteproduct',(req,res)=>{
    try{
    let id=req.query.id

    let idx=arr.findIndex((val)=>(val.id == id))
    if(idx>=0){
        arr.splice(idx,1)
        res.status(200).send({issuccessful : true , deleteVal : arr})
    }
    else{
        res.status(404).send({issuccessful : false , msg : "Not valid"})
    }
}
    catch(err){
        console.log(err)
        res.status(500).send({issuccessful: false, msg: "Server Error"})
    }
})


app.delete("/deletesoft",(req,res)=>{
    try{

    let id = req.query.id

    let idx = arr.find((val)=>(val.id == id));
    console.log(idx);

    if(idx && idx.isdelete == false){
        idx.isdelete = true;
        res.status(200).send({issuccessful : true, updatedproduct : arr})
    }

    else{
       res.status(400).send({issuccessful : false, msg:"product not verified", isdeleted : false})
    }
        
}
    catch(err){
        console.log(err)
        res.status(500).send({issuccessful: false, msg: "Server Error"})
    }     
    
})



app.get('/sort',(req,res)=>{
    let obj = arr.sort((a,b)=>{
        sort1=req.query.sort;
        if (sort1 == "acs"){
        return a.cost  - b.cost;
        res.send({issuccessful:true,product:obj})
     }
        else if (sort1 == "desc"){

            return b.cost  - a.cost }
            res.send({issuccessful:true,product:obj})
        
    })
    res.send({issuccess : true, sort : obj})
})



app.get('/filter',(req,res)=>{
    let obj = arr.filter((val)=>{
        return val.price > 500 && val.price<1000
    })
    if (obj.price>=500 && obj.price<=1000)
        res.send({issuccess : true, filter : obj})

    else
    res.send({issuccess : false, msg : "not valid", filter : obj})
})



app.get('/all',(req,res)=>{
    try{
    let ans = arr.filter((val)=>{
        return val.isdelete == false
    })
    if(ans){
   res.status(200).send({product : ans})}
    }
    catch(err){
        console.log(err)
        res.status(500).send({issuccessful: false, msg: "Server Error"})
    }
})

app.listen(process.env.port,()=>{
    console.log('port started on 4500')
})



