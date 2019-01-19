var router=require("express").Router();
var  questionsData=require('../dataBase/questionsData.json');


router.get('/allQuestions',function(req,res){
    res.json(questionsData); 
});



router.put('/:id',(req,res)=>{
    let body=req.body;
    let index=questionsData.findIndex(x=>x.id==req.params.id);
    if(index==-1){
        res.json("error : check id");
    }
    else{
        questionsData[index].answer=body.answer;
        res.json(questionsData);
    }

});




router.all("*",function(req,res){
    res.send("404 error");
});

module.exports=router;