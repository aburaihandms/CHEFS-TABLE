import { useState } from 'react';
import recipesData from './assets/recipes.json';
import './App.css';
function App() {
  const [wantToCook, setWantToCook] = useState([]);
  const [currentlyCooking, setCurrentlyCooking] = useState([]);

  const addToWantToCook = (recipe) => {
    if (!wantToCook.some((r) => r.recipe_id === recipe.recipe_id)) {
      setWantToCook([...wantToCook, recipe]);
    } else {
      alert('This recipe is already in the list!');
    }
  };

  const removeFromWantToCook = (recipe) => {
    setWantToCook(wantToCook.filter((r) => r.recipe_id !== recipe.recipe_id));
  };

  const prepareRecipe = (recipe) => {
    setCurrentlyCooking([...currentlyCooking, recipe]);
    removeFromWantToCook(recipe);
  };

  const totalPreparationTime = wantToCook.reduce((total, recipe) => total + parseInt(recipe.preparing_time), 0);
  const totalCalories = wantToCook.reduce((total, recipe) => total + parseInt(recipe.calories), 0);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">Recipe Calories</div>
        <ul className="menu">
          <li>Home</li>
          <li>Recipes</li>
          <li>About</li>
          <li>Search</li>
        </ul>
        <div className="user-icon">
          <img src="../Frame.png"/></div>
      </nav>

      {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>Welcome to our Recipe App</h1>
          <p>Explore a variety of delicious recipes!</p>
          <button>Explore Now</button>
          <button>Our Feedback</button>
        </div>
      </section>

      {/* Our Recipes Section */}
      <section className="our-recipes">
        <h2>Our Recipes</h2>
        <p>Discover our collection of mouthwatering recipes.</p>
      </section>

      {/* Recipe Cards Section */}
      <div className='recipes'>
        <div className="recipe-container">
        {recipesData.map((recipe) => (
          <div className="recipe-card" key={recipe.recipe_id}>
            <img src={recipe.image} alt={recipe.recipe_name} />
            <h3>{recipe.recipe_name}</h3>
            <p>{recipe.short_description}</p>
            <p>Ingredients: {recipe.ingredients.length}</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p>Preparing Time: {recipe.preparing_time}</p>
            <p>Calories: {recipe.calories}</p>
            <button onClick={() => addToWantToCook(recipe)}>Want to Cook</button>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div>
        <aside className="sidebar">
        <h2>Want to Cook</h2>
        <table>
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Preparation Time</th>
              <th>Calories</th>
              <th>Preparing Button</th>
            </tr>
          </thead>
          <tbody>
            {wantToCook.map((recipe) => (
              <tr key={recipe.recipe_id}>
                <td>{recipe.recipe_name}</td>
                <td>{recipe.preparing_time}</td>
                <td>{recipe.calories}</td>
                <td>
                  <button onClick={() => prepareRecipe(recipe)}>Prepare</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Currently Cooking</h2>
        <table>
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Preparation Time</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {currentlyCooking.map((recipe) => (
              <tr key={recipe.recipe_id}>
                <td>{recipe.recipe_name}</td>
                <td>{recipe.preparing_time}</td>
                <td>{recipe.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </aside>

      <div className="totals">
        <p>Total Preparation Time: {totalPreparationTime} min</p>
        <p>Total Calories: {totalCalories} cal</p>
      </div>
      </div>
      </div>
      
    </div>
  );
}

export default App