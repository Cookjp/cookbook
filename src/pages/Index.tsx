import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


async function fetchIndex() : Promise<string[]> {
    return fetch('recipe/index.json', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
     },
    })
    .then(response => response.json())
}

const Index = () => {
    const [recipes, setRecipes] = useState<string[]>([])

    useEffect(() => {
        fetchIndex().then((recipeJson) => {
            console.log(recipeJson)
            setRecipes(recipeJson)
        })
    }, [])

  return (
    <>
    {recipes.map((recipe) => (
        <Link key={recipe} to={`/recipe/${recipe}`}>
            <button>{recipe}</button>
        </Link>
    ))}
    </>
  )
}

export default Index