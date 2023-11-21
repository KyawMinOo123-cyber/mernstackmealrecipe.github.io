import { useGetUserID } from '../hooks/useGetUserID';
import {useState, useEffect} from 'react'
import axios from "axios";
const SavedRecipe =()=>{
    const [savedRecipes,setSavedRecipes] = useState([])
    const userID = useGetUserID()

    useEffect(()=>{

        const fetchSavedRecipes = async()=>{
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
                setSavedRecipes(response.data.savedRecipes)
            } catch (error) {
                console.error()
            }
        };

        fetchSavedRecipes()

    } , []);
    
    return<div className='homeRecipe'>
        <h1>Saved Recipes</h1>
        <div className='recipesCenter'>
            <div className='recipeGrid'>
                {
                    savedRecipes.map((reci)=>(
                        <div className='singleRecipe' key={reci._id}>
                            <h2>{reci.name}</h2>
                            <p>{reci.instruction}</p>
                            <img src={reci.imageUrl} alt={reci.name}/>
                            <p>Cooking Time : {reci.cookingTime} (minutes)</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}

export default SavedRecipe