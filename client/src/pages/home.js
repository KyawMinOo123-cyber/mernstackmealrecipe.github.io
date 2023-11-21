import { useGetUserID } from '../hooks/useGetUserID';
import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'

import axios from "axios";
const Home =()=>{
    const [recipe,setRecipe] = useState([])
    const [savedRecipes,setSavedRecipes] = useState([])
    const[cookies,_] = useCookies(['access_token'])

    const userID = useGetUserID()

    useEffect(()=>{

        const fetchRecipes = async()=>{
            try {
                const response = await axios.get("http://localhost:3001/recipes")
                setRecipe(response.data)
               // console.log(response.data)
            } catch (error) {
                console.error()
            }
        };

        const fetchSavedRecipes = async()=>{
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
                setSavedRecipes(response.data.savedRecipes)
            } catch (error) {
                console.error()
            }
        };

        fetchRecipes()
        if(cookies.access_token) fetchSavedRecipes()

    } , []);

    const saveRecipe=async(recipeID)=>{
        try {
            const response = await axios.put("http://localhost:3001/recipes",
            {
                recipeID,
                userID
            },{
                headers:{
                    authorization: cookies.access_token
                }
            })
            setSavedRecipes(response.data.savedRecipes)
        } catch (error) {
            console.error()
        }
    }
    
    const isSavedRecipe =(id)=>savedRecipes.includes(id);

    return<div className='homeRecipe'>
        <h1>Recipes</h1>
        <div className='recipesCenter'>
            <div className='recipeGrid'>
                {
                    recipe.map((reci)=>(
                        <div className='singleRecipe' key={reci._id}>
                            <h2>{reci.name}</h2>
                            <button onClick={()=>saveRecipe(reci._id)}
                                 disabled={isSavedRecipe(reci._id)}> 
                                { isSavedRecipe(reci._id) ? "Saved" : "Save"}
                            </button>
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

export default Home