import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/custom-error';
import Cart, { ICart, cartValidationSchema } from '../models/Cart';

// Create a new cart for a user
export const upsertCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const {user} = req.body;

     //check if cart exist for the user
     let userCart = await Cart.findOne({userId: user.id});
     if(!userCart) {
      userCart = await Cart.create({userId: user.id, products: [req.body],})
     }
     else {
      userCart.products.push(req.body);
      await userCart.save()
     }

    res.status(201).json({
      message:"Cart updated successfully ",
      data:userCart
    });
  } catch (error) {
   next(error);
  }
};


// Get a single cart by user ID
export const getCartByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.user?.id});

    if (!cart) {
     const err = new CustomError('Cart not found',400);
     throw err;
    }

    res.json({
      message:"user's cart found",
      data:cart
    });
  } catch (error) {
   next(error);
  }
};


export const updateCartProduct = async(req:Request,res:Response, next: NextFunction)=>{
  try{
    const {productId }= req.params;
    const {quantity} = req.body;
    const cart = await Cart.updateOne({"products._id":productId}, {"$set":{"products.$.quantity":quantity}});

   if(cart){
    res.status(200).json({
      message:'quantity updated'
    })
   }
  }catch(error){
   next(error);
  }
}


export const deleteCartProduct = async(req:Request,res:Response, next: NextFunction)=>{
  try{
     const {productId }= req.params
    const cart = await Cart.updateOne({userId:req.body.user.id},{"$pull":{"products":{_id:productId}}},{ safe: true, multi:true });
    if(cart){
      res.status(200).json({
        message:"product deleted",
        data: null
      })
    }
  }catch(error){
    next(error)
  }
}