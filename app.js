function searchMeal() {
    const food = document.getElementById("food-name").value;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${food}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getMeals(data))

    const getMeals = mealNames => {
        const meals = mealNames.meals;
        const mealsDiv = document.getElementById('meals');
	    mealsDiv.innerHTML = '';

        meals.forEach(meal => {
            console.log(meal);
            const mealDiv = document.createElement('div');
            mealDiv.className = "meal";


            const mealInfo =
                `
                           <img onclick="displayMealDetails('${meal.strMeal}')" src=${meal.strMealThumb}>
                            <p onclick="displayMealDetails('${meal.strMeal}')">${ meal.strMeal }</p>
                        `
            mealDiv.innerHTML = mealInfo;
            mealsDiv.appendChild(mealDiv);

        });

    }


}

const displayMealDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => disPlayMealInfo(data.meals[0]))


}

const disPlayMealInfo = meal => {
        const ingredients = [];

        // Get all ingredients from the object. Up to 20
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(
                        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			);
		} else {
			// Stop if there are no more ingredients
			break;
		}
	}

	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img  src="${meal.strMealThumb}" alt="Meal Image">
				${
					meal.strCategory
						? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
						: ''
				}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${
					meal.strTags
						? `<p><strong>Tags:</strong> ${meal.strTags
								.split(',')
								.join(', ')}</p>`
						: ''
				}
				<h4>Ingredients:</h4>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		
	`;
    const mealInfo = document.getElementById('mealInfo');
 	mealInfo.innerHTML = newInnerHTML;

}
