const reviewForm = document.querySelector('#reviewForm');
const companyNameInput = document.querySelector('#companyName');
const prosInput = document.querySelector('#pros');
const consInput = document.querySelector('#cons');
const ratingInput = document.querySelector('#rating');
const reviewsList = document.querySelector('#reviewsList');
const avgRatingSpan = document.querySelector('#avgRating');
const searchInput = document.querySelector('#searchCompanyInput');
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', searchCompany);

// Load reviewsData from server on page load
async function loadReviews() {
  try {
    const response = await axios.get("/get-review");
    console.log('Received Reviews:', response);
    showReviewsOnScreen(response.data);
  } catch (err) {
    console.log(err);
  }
}

reviewForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", loadReviews);

async function onSubmit(e) {
  e.preventDefault();

  const reviewDetails = {
    companyName: companyNameInput.value,
    pros: prosInput.value,
    cons: consInput.value,
    rating: ratingInput.value
  };

  try {
    // Update the server with the new review
    const response = await axios.post("/add-review", reviewDetails);
    console.log('Review created successfully:', response.data);

    // Reload reviews from the server
    loadReviews();

    // Clear form inputs
    clearInputs();
  } catch (err) {
    console.log('Error creating review:', err);
  }
}

function showReviewsOnScreen(reviews) {
  reviewsList.innerHTML = '';

  if (Array.isArray(reviews)) {
    const avgRatings = {};

    reviews.forEach((review) => {
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

async function searchCompany(e)
{
  
  const char = searchInput.value.toLowerCase();
  try {
    const response = await axios.get("/get-review");
    const filteredReviews = response.data.filter((review) =>
            review.companyName.toLowerCase().includes(char)
    );
    console.log(filteredReviews);
    showReviewsOnScreen(filteredReviews);
  } catch (error) {
    console.log(error);
  }

}

function clearInputs() {
  companyNameInput.value = '';
  prosInput.value = '';
  consInput.value = '';
  ratingInput.value = '';
}
