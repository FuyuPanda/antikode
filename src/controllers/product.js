const {Product, sequelize}=require('../models');
const {getPagination}=require('../common/pagination');
const {Op}=require('sequelize');


exports.createProduct=async(req,res)=>{
    try{
        const{id}=req.params;
        const {body}=req;
        const check=await Product.findOne({
            where:{
                OutletId:id,
                Name:{
                    [Op.like]:'%'+body.name+'%'
                }
            }
        });
        if(check==null)
        {
           const newProduct=await Product.create({
               OutletId:id,
               Name:body.name,
               Image:body.image,
               Price:body.price,
               Status:body.status
           });
           return res.status(200).send({
               status:"Success",
               code:200,
               message:"Product has been successfuly inserted!"
           }); 
            
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"This product already exist for this outlet!"
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

exports.updateProduct=async(req,res)=>{
    try{
        const {outletId,id}=req.params;
        const{body}=req;
        const updateproduct=await Product.update({
            Name:body.name,
            Image:body.image,
            Price:body.price,
            Status:body.status,
        },{
            where:{
                OutletId:outletId,
                id:id
            }
        });
        if(updateproduct)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Product has been updated successfuly!"
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"Product could not be updated!"
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

exports.getProductByOutletId=async(req,res)=>{
    try{
        const{brandId,id}=req.params;
        const{page,size}=req.query;
        const {limit,offset}=getPagination(page,size);
        const data=new Array();
        let raw="Select a.Id as id,a.Name as productName,a.Price as productPrice, a.Status as status,b.Name as outletName,b.Id as outletId,c.Name as brandName, c.Id as brandId "+
        "From products as a join outlets as b on a.OutletId = b.Id "+
        "Join brands as c on b.BrandId=c.Id "+
        "Where b.BrandId="+brandId+" and b.Id="+id+" ";
        const count=await sequelize.query(raw);
        if(page>0 && size>0)
        {
            raw+="Limit "+offset+","+limit;
        }
        const query=await sequelize.query(raw);
        if(query[0].length>0)
        {
            for(var i=0;i<query[0].length;i++)
            {
                data.push(query[0][i]);
            }
            return res.status(200).send({
                status:"Succes",
                code:200,
                message:"Ok",
                data,
                page:parseInt(page),
                size:parseInt(size),
                count:count[0].length
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"No Result!"
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

exports.getAllProducts=async(req,res)=>{
    try{
        const data=new Array();
        const{page,size}=req.query;
        const {limit,offset}=getPagination(page,size);
        let raw="Select a.Id as id,a.Name as productName,a.Price as productPrice, a.Status as status,b.Name as outletName,b.Id as outletId,c.Name as brandName, c.Id as brandId "+
        "From products as a join outlets as b on a.OutletId = b.Id "+
        "Join brands as c on b.BrandId=c.Id ";
        const count=await sequelize.query(raw);
        if(page>0 && size>0)
        {
            raw+="Limit "+offset+","+limit;
        }
        const query=await sequelize.query(raw);
        if(query[0].length>0)
        {
            for(var i=0;i<query[0].length;i++)
            {
                data.push(query[0][i]);
            }
            return res.status(200).send({
                status:"Succes",
                code:200,
                message:"Ok",
                data,
                page:parseInt(page),
                size:parseInt(size),
                count:count[0].length
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"No Result!"
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

exports.getProductById=async(req,res)=>{
    try{
        const{brandId,outletId,id}=req.params;
        let raw="Select a.Id as id,a.Name as productName,a.Price as productPrice, a.Status as status,b.Name as outletName,b.Id as outletId,c.Name as brandName, c.Id as brandId "+
        "From products as a join outlets as b on a.OutletId = b.Id "+
        "Join brands as c on b.BrandId=c.Id "+
        "Where b.BrandId="+brandId+" and b.Id="+outletId+" and a.Id="+id;
        const data=await sequelize.query(raw);
        if(data!=null)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                data:data[0][0]
            });

        }
        else{
            return res.status(404).send({
                status:"Error",
                code:404,
                message:"Product not found!"
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


exports.deleteProduct=async(req,res)=>{
    try{
        const{id}=req.params;
        const delete_product=await Product.destroy({
            where:{
                id:id
            }
        });
        if(delete_product)
        {
            return res.status(200).send({
                status:"Success",
                code:200,
                message:"Product has been deleted!"
            });
        }
        else{
            return res.status(400).send({
                status:"Error",
                code:400,
                message:"Product could not be deleted!"
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