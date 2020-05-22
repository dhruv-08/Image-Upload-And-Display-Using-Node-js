var express=require('express');
var bodyParser=require('body-parser');
var multer=require('multer');
var fs=require('fs');
var router=express.Router();
router.use(express.static("routes"));
router.use(bodyParser.json());
var x="";
var storage=multer.diskStorage({
    destination:(res,file,cb)=>{
        cb(null,'routes/images');
    },
    filename:(res,file,cb)=>{
        cb(null,file.originalname);
    }
});
const upload=multer({storage:storage});
router.get('/',function(req,res,next){
    router.use(express.static("routes"));
    res.sendFile(__dirname+'/image.html');
});
router.post('/upload',upload.single('myfile'),function(req,res,next){
        res.statusCode=200;
        res.setHeader('Content-Type','text/html');
        x='./images/'+req.file.originalname;
        res.redirect('/image');
});
router.get('/image',function(req,res){
    router.use(express.static("routes"));
    res.end('<html><body><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><img style="height:100vh" src='+x+'><br><br><a href="image.html" class="btn btn-danger" role="button">DONE!</a></body></html>');
    x="";
});
module.exports=router;