import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import {useGetUserID} from '../hooks/useGetUserID.js'
import {useCookies} from 'react-cookie'

import axios from "axios"

const CreateRecipe =()=>{
    const[cookies,_] = useCookies(['access_token'])

    const userID = useGetUserID()
    const navigate = useNavigate()

    const[recipe,setRecipe] = useState({
        name:"",
        ingredients:[],
        instructions:"",
        imageUrl:"",
        cookingTime:0,
        userOwner:userID,
    })


    const handleChange =(e)=>{
        const {name,value} = e.target;
        setRecipe({...recipe,[name]:value})
    }

    const ingredientChange =(event,idx)=>{
        const {value} = event.target;
        const ingredients = recipe.ingredients
        ingredients[idx] = value
        setRecipe({...recipe,ingredients})
       // console.log(recipe)
    }

    const addIngredients =()=>{
        setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
    }

    const onSubmit =async(e)=>{
        e.preventDefault()
        try {
            await axios.post("http://localhost:3001/recipes",recipe,{
                headers:{
                    authorization: cookies.access_token
                }
            })
            alert("Recipe Created Successfully!")
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }
    return<div className="create-recipe">
        <h2>Create Recipe</h2>
        <form  className='recipeForm' onSubmit={onSubmit}>

            <label htmlFor="name">Name</label>
            <input
             type="text" 
             name='name' 
             id="name" 
             onChange={handleChange} />

            <label htmlFor="ingredients">Ingredients</label>
            {
                recipe.ingredients.map((ingredient,idx)=>(
                    <input 
                          key={idx}
                          type='text'
                          name='ingredients'
                          value={ingredient}
                          onChange={(event)=>ingredientChange(event,idx)}/>
                ))
            }
            <button onClick={addIngredients} type='button'>Add Ingredients</button>



            <label htmlFor="instruction">Instruction</label>
            <textarea 
            id="instruction" 
            name="instruction" 
            onChange={handleChange} ></textarea>

            <label htmlFor="imageUrl">Image URL</label>
            <input 
            type="text" 
            id="imageUrl" 
            name="imageUrl" 
            onChange={handleChange} />

            <label htmlFor="cookingTime">Cooking Time(minutes)</label>
            <input 
            type="number" 
            id="cookingTime" 
            name="cookingTime" 
            onChange={handleChange} />
            <button type='submit'>Create Recipe</button>
        </form>
    </div>
        
}

export default CreateRecipe