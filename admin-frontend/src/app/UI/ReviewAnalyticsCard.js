import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import { countReviewsByMovieId, getAverageRatingForMovie } from 'app/queries/review-queries';
import { getAllMovies } from 'app/queries/movie-queries';

const ReviewAnalyticsCard = () => {
    const [movieData, setMovieData] = useState([]);
    const reviewCountChartRef = useRef(null);
    const averageRatingChartRef = useRef(null);

    useEffect(() => {
        const fetchMovieData = async () => {
        try {
            const movies = await getAllMovies();

            const movieDataPromises = movies.map(async (movie) => {
            const movieId = movie.id;
            const movieTitle = movie.title;
            const reviewCount = await countReviewsByMovieId(movieId);
            const averageRating = await getAverageRatingForMovie(movieId);

            return {
                movieTitle,
                reviewCount,
                averageRating,
            };
            });

            const movieDataResult = await Promise.all(movieDataPromises);
            setMovieData(movieDataResult);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
        };

        fetchMovieData();
    }, []);

    useEffect(() => {
        // Destroy existing charts
        if (reviewCountChartRef.current) {
        reviewCountChartRef.current.destroy();
        }
        if (averageRatingChartRef.current) {
        averageRatingChartRef.current.destroy();
        }

        // We use a bar chart to visually represent review analytics because it effectively displays the number of reviews for each movie.
        // The length of the bars directly corresponds to the review count, making it easy to compare review numbers for different movies.
        // This visual representation is intuitive and provides a clear understanding of review distribution across movies.
        
        const reviewCountCanvas = document.getElementById('reviewCountChart');
        if (reviewCountCanvas) {
        const ctx = reviewCountCanvas.getContext('2d');
        const labels = movieData.map((movie) => movie.movieTitle);
        const data = movieData.map((movie) => movie.reviewCount);

        reviewCountChartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
            labels,
            datasets: [{
                label: 'Review Count',
                data,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }],
            },
            options: {
            scales: {
                x: {
                title: {
                    display: true,
                    text: 'Movies',
                },
                },
                y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Review Count',
                },
                },
            },
            },
        });
        }

        // Similarly, we use a bar chart to visually represent average rating analytics because it effectively displays the average rating for each movie.
        // The length of the bars directly corresponds to the average rating, making it easy to compare average ratings for different movies.
        // This visual representation is intuitive and provides a clear understanding of average ratings across movies.

        const averageRatingCanvas = document.getElementById('averageRatingChart');
        if (averageRatingCanvas) {
        const ctx = averageRatingCanvas.getContext('2d');
        const labels = movieData.map((movie) => movie.movieTitle);
        const data = movieData.map((movie) => movie.averageRating);

        averageRatingChartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
            labels,
            datasets: [{
                label: 'Average Rating',
                data,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            }],
            },
            options: {
            scales: {
                x: {
                title: {
                    display: true,
                    text: 'Movies',
                },
                },
                y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Average Rating',
                },
                },
            },
            },
        });
        }
    }, [movieData]);

  return (
    <div className="w-full h-full p-4 bg-[#282b2e] rounded-sm flex flex-col text-white justify-between">
      <div className="w-full flex flex-col">
        {/* Bar chart for review count */}
        <div className="mb-4">
          <h2 className="font-bold">Review Count per Movie</h2>
          <canvas id="reviewCountChart" width="400" height="200"></canvas>
        </div>
        <br></br>
        {/* Bar chart for average rating */}
        <div>
          <h2 className="font-bold">Average Rating per Movie</h2>
          <canvas id="averageRatingChart" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalyticsCard;
