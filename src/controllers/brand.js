const {Brand}=require('../models');

exports.CreateBrand=async(req,res)=>{
    try{
        const {body}=req;
        const newBrand=await Brand.create({
            Name:body.name,
            Logo:body.logo,
            Banner:body.banner,
            Status:body.status
        });
        const data=await Brand.findOne({
            where:{
                id:newBrand.id
            }
        });
        return res.status(200).send({
            status:"Success",
            code:200,
            message:"Ok",
            data
        });

    }
    catch(err)
    {
        return res.status(500).send({
            status:"Error",
            code:500,
            message:err.message
        });
    }
}

exports.GetBrand=async(req,res)=>{
    try{
        const data=await Brand.findAll();
        if(data.length>0)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Ok",
                data
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"No data available!"
            });
        }

    }
    catch(err)
    {
        return res.status(500).send({
            status:"Error",
            code:500,
            message:err.message
        })
    }
}

exports.GetById=async(req,res)=>{
    try{
        const {id}=req.params;
        const brand=await Brand.findOne({
            where:{
                id:id
            }
        });
        if(brand!=null)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Ok",
                data:{
                    id:brand.id,
                    name:brand.Name,
                    logo:brand.Logo,
                    banner:brand.Banner,
                    status:brand.Status
                }
            });
        }
        else{
            return res.status(404).send({
                status:"Error",
                code:404,
                message:"Data not found!"
            });
        }

    }
    catch(err)
    {
        return res.status(500).send({
            status:"Error",
            code:500,
            message:err.message
        });
    }
}

exports.updateBrand=async(req,res)=>{
    try{
        const {id}=req.params;
        const {body}=req;
        const updatebrand=await Brand.update({
            Name:body.name,
            Status:body.status,
            Logo:body.logo,
            Banner:body.banner
        },{
            where:{
                id:id
            }
        });
        if(updatebrand)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Brand has been updated successfuly!"
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"Brand could not be updated!"
            });
        }

    }
    catch(err)
    {
        return res.status(500).send({
            status:"Error",
            code:500,
            message:err.message
        });
    }
}