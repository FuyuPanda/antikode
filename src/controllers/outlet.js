const {Outlet}=require('../models');
const {getDistance}=require('../common/distance');
const {Op}=require('sequelize');

exports.createOutlet=async(req,res)=>{
    try{
        const {id}=req.params;
        const{body}=req;
        var check=await Outlet.findOne({
            where:{
                BrandId:id,
                Name:{
                    [Op.like]:'%'+body.name+'%'
                }
            }
        });
        if(check==null)
        {
            const newOutlet=await Outlet.create({
                BrandId:id,
                Name:body.name,
                Image:body.image,
                Latitude:body.latitude,
                Longitude:body.longitude,
                Status:body.status
            });
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Outlet has been inserted successfuly!"
            });

        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"Outlet already exist"
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

exports.getOutlet=async(req,res)=>{
    try{
        const{id}=req.params;
        const data=new Array();
        const outlet=await Outlet.findAll({
            where:{
                BrandId:id
            }
        });
        if(outlet.length>0)
        {
            for(var i=0;i<outlet.length;i++)
            {
                let distance=getDistance(outlet[i].Latitude,outlet[i].Longitude);
                const items={
                    id:outlet[i].id,
                    name:outlet[i].Name,
                    image:outlet[i].Image,
                    address:outlet[i].Address,
                    latitude:outlet[i].Latitude,
                    longitude:outlet[i].Longitude,
                    distance:distance
                };
                data.push(items);
            }
            data.sort(function(a,b){
                return a.distance-b.distance
            });
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
                message:"There is no data available"
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

exports.getOutletById=async(req,res)=>{
    try{
        const {brandId,id}=req.params;
        const outlet=await Outlet.findOne({
            where:{
                BrandId:brandId,
                id:id
            }
        });
        if(outlet!=null)
        {
            const distance=getDistance(outlet.Latitude,outlet.Longitude)
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Ok",
                data:{
                    id:outlet.id,
                    name:outlet.Name,
                    image:outlet.Image,
                    address:outlet.Address,
                    latitude:outlet.Latitude,
                    longitude:outlet.Longitude,
                    distance:distance,
                    status:outlet.Status
                }
            })

        }
        else{
            return res.status(404).send({
                status:"Error",
                code:404,
                message:"Outlet doesn't exist!"
            })
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

exports.updateOutlet=async(req,res)=>{
    try{
        const{brandId,id}=req.params;
        const{body}=req;
        const updateData=await Outlet.update({
            Name:body.name,
            Status:body.status,
            Latitude:body.latitude,
            Longitude:body.longitude,
            Image:body.image
        },{
            where:{
                BrandId:brandId,
                id:id
            }
        });
        if(updateData)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Outlet has been updated successfuly"
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"Outlet could not be updated!"
            })
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

exports.deleteOutlet=async(req,res)=>{
    try{
        const{brandId,id}=req.params;
        const deleteData=await Outlet.destroy({
            where:{
                BrandId:brandId,
                id:id
            }
        });
        if(deleteData)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Outlet has been deleted successfuly"
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"Outlet could not be deleted!"
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