import Product from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op, where } from "sequelize";

export const getProducts = async(req,res) =>{
  try {
    let response;
    if(req.role === "admin"){
      response = await Product.findAll({
        attributes:["uuid","name","price"],
        include:[{
          model:Users,
          attributes: ["name","email"]
        }]
      });
    }else{
      response = await Product.findAll({
        attributes:["uuid","name","price"],
        where:{
          userId:req.userId
        },
        include:[{
          model:Users,
          attributes: ["name","email"]
        }]
      });
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

export const getProductById = async(req,res) =>{
  try {
    const products = await Product.findOne({
      where:{
        uuid:req.params.id
      }
    })

    if(!products) return res.status(404).json({msg:"data tidak ditemukan"});


    let response;
    if(req.role === "admin"){
      response = await Product.findOne({
        attributes:["uuid","name","price"],
        where:{
          id:products.id
        },
        include:[{
          model:Users,
          attributes: ["name","email"]
        }]
      });
    }else{
      response = await Product.findOne({
        attributes:["uuid","name","price"],
        where:{
          [Op.and]:[{id:products.id}, {userId:req.userId}],
          userId:req.userId
        },
        include:[{
          model:Users,
          attributes: ["name","email"]
        }]
      });
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

export const createProduct = async(req,res) =>{
  const {name,price} = req.body;
  try {
    await Product.create({
      name:name,
      price:price,
      userId: req.userId
    });
    res.status(201).json({msg: "Product Created Succesfully"});
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

export const updateProduct = async(req,res) =>{
  try {
    const products = await Product.findOne({
      where:{
        uuid:req.params.id
      }
    })

    if(!products) return res.status(404).json({msg:"data tidak ditemukan"});

    const {name,price} = req.body;
    if(req.role === "admin"){
      await Product.update({name,price},{
        where:{
          id:products.id
        }
      })
    }else{
      if(req.userId !== products.userId) return res.status(403).json({msg:"akses terhalang"}); 
      await Product.update({name,price},{
        where:{
          [Op.and]:[{id:products.id}, {userId:req.userId}],
        }
      })
    }
    res.status(200).json({msg:"product updated succesfully"})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

export const deleteProduct = async (req,res) =>{
  try {
    const products = await Product.findOne({
      where:{
        uuid:req.params.id
      }
    })

    if(!products) return res.status(404).json({msg:"data tidak ditemukan"});

    const {name,price} = req.body;
    if(req.role === "admin"){
      await Product.destroy({
        where:{
          id:products.id
        }
      })
    }else{
      if(req.userId !== products.userId) return res.status(403).json({msg:"akses terhalang"}); 
      await Product.destroy({
        where:{
          [Op.and]:[{id:products.id}, {userId:req.userId}],
        }
      })
    }
    res.status(200).json({msg:"product deleted succesfully"})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}