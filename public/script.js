const reviewForm = document.querySelector('#reviewForm');
const companyNameInput = document.querySelector('#companyName');
const prosInput = document.querySelector('#pros');
const consInput = document.querySelector('#cons');
const ratingInput = document.querySelector('#rating');
const reviewsList = document.querySelector('#reviewsList');
const avgRatingSpan = document.querySelector('#avgRating');

const reviewsData = []; // Store reviews data

reviewForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("/get-review");
    console.log('Received Reviews:', response);
    reviewsData.push(...response.data);
    showReviewsOnScreen();
  }
  catch (err) {
    console.log(err);
  }
});

function onSubmit(e) {
  e.preventDefault();

  const reviewDetails = {
    companyName: companyNameInput.value,
    pros: prosInput.value,
    cons: consInput.value,
    rating: ratingInput.value
  };

  reviewsData.push(reviewDetails); // Add new review to data

  try {
    // Update the server with the new review (axios.post("/add-review", reviewDetails) ...)

    // Calculate and display average rating
    showReviewsOnScreen();
    clearInputs();

  } catch (err) {
    console.log('Error creating review:', err);
  }
}

function showReviewsOnScreen() {
  reviewsList.innerHTML = '';

  if (Array.isArray(reviewsData)) {
    const avgRatings = {};

    reviewsData.forEach((review) => {
      const companyElement = document.createElement('div');
      companyElement.classList.add('review');

      const rating = parseInt(review.rating);
      const companyName = review.companyName;

      companyElement.innerHTML = `
        <h1>${companyName}</h1>
        <p>Pros: ${review.pros}</p>
        <p>Cons: ${review.cons}</p>
        <p>Rating: ${review.rating} Stars</p>
      `;

      if (avgRatings[companyName]) {
        avgRatings[companyName].totalRating += rating;
        avgRatings[companyName].reviewCount += 1;
      } else {
        avgRatings[companyName] = {
          totalRating: rating,
          reviewCount: 1
        };
      }

      reviewsList.appendChild(companyElement);
    });

    // Calculate and display average rating
    calculateAndDisplayAverageRating(avgRatings);
  }
}

function calculateAndDisplayAverageRating(avgRatings) {
  avgRatingSpan.innerHTML = '';

  Object.keys(avgRatings).forEach((companyName) => {
    const averageRating =
      avgRatings[companyName].totalRating / avgRatings[companyName].reviewCount;

    const avgRatingElement = document.createElement('div');
    avgRatingElement.innerHTML = `
      <p>${companyName} - Average Rating: ${averageRating.toFixed(2)} Stars</p>
    `;

    avgRatingSpan.appendChild(avgRatingElement);
  });
}

function clearInputs() {
  companyNameInput.value = '';
  prosInput.value = '';
  consInput.value = '';
  ratingInput.value = '';
}
