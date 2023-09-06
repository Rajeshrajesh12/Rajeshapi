const express=require('express');
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/e-com');

const Productsch=new mongoose.Schema({ name:String,mobile:Number,place:String});
 let enteries=mongoose.model('enteries',Productsch);

 const app=express();
 app.use(express.json());


 app.post('/write',async(req,resp)=>{
    const data=new enteries(req.body);
    const result=await data.save();
    resp.send(data);
 })

 app.get('/read',async(req,resp)=>{
    const data=await enteries.find();
    console.log(data);
    resp.send(data);
 })

 app.delete('/delete/:_id',async(req,resp)=>{
    const data=await enteries.deleteOne(req.params);
   resp.send('done')
 })

 app.put('/update/:name',async(req,resp)=>{
    const data=await enteries.updateOne(
        {name:req.params.name},
        {$set:req.body}
    );
   resp.send('done')
 })

 app.get('/search/:key',async(req,resp)=>{

    const data=await enteries.find(
        {
            "$or":[{"name":{$regex:req.params.key}},
            {"place":{$regex:req.params.key}}]
        }
    );
    resp.send(data);
 })

 app.listen(5000);