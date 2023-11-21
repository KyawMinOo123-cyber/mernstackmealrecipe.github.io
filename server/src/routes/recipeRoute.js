import { recipeModel } from "../models/recipes.js";
import express from 'express'
import { userModel } from "../models/users.js";
import { verifyTwoken } from "./userRoute.js";
const router  = express.Router()


// get all recipes from database
router.get('/',async(req,res)=>{
    try {
        const response = await recipeModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})


// create a new recipe 
router.post('/',verifyTwoken,async(req,res)=>{

    const recipe = new recipeModel(req.body)

    try {
        const response  = await recipe.save()
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

// save new recipe to ID user
router.put('/',verifyTwoken,async(req,res)=>{
    try {
        const recipe =await recipeModel.findById(req.body.recipeID);
        const user =await userModel.findById(req.body.userID)
        user.savedRecipes.push(recipe)
        await user.save() 
        res.json({savedRecipes : user.savedRecipes})
    } catch (error) {
        res.json(error)
    }
})

// getting recipes with ID user  ********************
router.get("/savedRecipes/ids/:userID", async (req,res)=>{
    try {
        const user = await userModel.findById(req.params.userID);
        res.json({savedRecipes: user?.savedRecipes});
    } catch (error) {
        res.json(error)
    }
})

//getting all saved recipes from database when login fro saved recipe page
router.get("/savedRecipes/:userID",async (req,res)=>{
    try {
        const user = await userModel.findById(req.params.userID)
        const savedRecipes = await recipeModel.find({
            _id:{$in: user.savedRecipes}
        })
        res.json({savedRecipes});
    } catch (error) {
        res.json(err);
    }
})

export {router as recipeRouter}