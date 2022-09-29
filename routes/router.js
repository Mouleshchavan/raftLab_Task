
const { response } = require("express");
const express = require("express");
const router = new express.Router();
const conn = require("../db/conn")

//city
router.post("/createCity", (req,res)=>{
  const {ID,City,StateID } = req.body
 
    if(!ID || !City || !StateID){
        res.status(422).send("plz fill the all data")
    } 
      try{
        conn.query("INSERT INTO tblcity SET ?", {ID,City,StateID},(err,result)=>{
                         if(err){
                             console.log("err" + err)
 
                         }else{
                             res.status(201).send(req.body)
                         }
                 })
             }catch(error){
     res.status(422).send("error")
    }
 });


 //state
 router.post("/createState", (req,res)=>{
    const {id,name,country_id } = req.body
   
      if(!id || !name || !country_id){
          res.status(422).json("plz fill the all data")
      } 
        try{
          conn.query("INSERT INTO tblState (id,name,country_id) VALUES  ("+ req.body+ ", 1)", {id,name,country_id},(err,result)=>{
                           if(err){
                               console.log("err" + err)
   
                           }else{
                               res.status(201).json(req.body)
                           }
                   })
               }catch(error){
       res.status(422).json("error")
      }
   });

   //country
   router.post("/createCountry", (req,res)=>{
    const {ID,Country} = req.body
   
      if(!ID || !Country ){
          res.status(422).json("plz fill the all data")
      } 
        try{
          conn.query("INSERT INTO tblcountry SET ?", {ID,Country},(err,result)=>{
                           if(err){
                               console.log("err" + err)
   
                           }else{
                               res.status(201).json(req.body)
                           }
                   })
               }catch(error){
       res.status(422).json("error")
      }
   });





//register user data 
router.post("/createEmp", (req,res)=>{

     try{
   const {FirstName,LastName,Email,MobileNo,Hobbies,Gender,RegistrationDate,CountryID,StateID,CityID  } = req.body

   if( !FirstName || !LastName || !Email ||!MobileNo || !Hobbies || !Gender || !RegistrationDate || !CountryID ||!StateID ||!CityID){
       res.status(422).json("plz fill the all data")
   } 
   
   if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) return res.status(400).send({ status: false, message: "enter valid email" })
   if (!(/^[6-9]{1}[0-9]{9}$/im.test(MobileNo))) return res.status(400).send({ status: false, message: "phone No is invalid" })
   if (!(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).test(RegistrationDate)) return res.status(400).send({ status: false, message: "date format is not valid" })


    conn.query("SELECT * FROM tblemp WHERE Email = ?",Email,(err,result)=>{
            if(result.length ){
                res.status(422).json("this data is already exist")
            } //if i get data 
            else{
                conn.query("INSERT INTO tblemp SET ?", {FirstName,LastName,Email,MobileNo,Hobbies,Gender,RegistrationDate,CountryID,StateID,CityID},(err,result)=>{
                        if(err){
                            console.log("err" + err)

                        }else{
                            res.status(201).json(req.body)
                        }
                })
            }
       })
    }
   
   catch(error){
    res.status(422).json("error")
   }
});

//get user data
router.get("/getemployee",(req,res)=>{
    conn.query("SELECT e.ID,e.FirstName,e.LastName,e.Email,e.MobileNo,e.Hobbies,e.Gender,e.RegistrationDate,c.City,s.State,co.Country FROM tblemp e INNER JOIN tblcity c ON e.cityID = c.ID INNER JOIN tblstate s ON e.StateID = s.ID INNER JOIN tblcountry co ON e.CountryID = co.ID", (err,result)=>{
        if(err ){
            res.status(422).json("no data available")
        } //data not present 
        else{
            res.status(201).json(result)
        }
    });
})

//user delete  api

router.delete("/deleteEmp/:id", (req,res)=>{
    const {id} = req.params;

    conn.query("DELETE FROM tblemp WHERE id = ? ",id, (err,result)=>{
        if(err ){
            res.status(422).json("error")
        } //data not present 
        else{
            res.status(201).json(result)
        }
    })
});

//update users api
router.patch("/updateEmp/:id", (req,res)=>{
    const {id} = req.params;

    const data = req.body;

    conn.query(" UPDATE tblemp SET ?  WHERE id = ? ",[data,id], (err,result)=>{
        if(err ){
            res.status(422).json({message:"error"})
        } //data not present 
        else{
            res.status(201).json(result)
        }
    })
});

//for automatic data we are using data[0] in client field
module.exports = router;


