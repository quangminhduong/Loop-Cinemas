import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { getAllMovies, getMovieVisits } from 'app/queries/movie-queries';

const MovieVisitAnalyticsCard = () => {
    useEffect(() => {
      const fetchMovieVisitsData = async () => {
        try {
          const movies = await getAllMovies();
  
          const movieDataPromises = movies.map(async (movie) => {
            const movieId = movie.id;
            const movieTitle = movie.title;
            const movieVisits = await getMovieVisits(movieId);
  
            return {
              movieId,
              movieTitle,
              movieVisits,
            };
          });
  
          const movieDataResult = await Promise.all(movieDataPromises);
  
          // Render the pie chart using movieDataResult
          renderPieChart(movieDataResult);
        } catch (error) {
          console.error('Error fetching movie visits data:', error);
        }
      };
  
      fetchMovieVisitsData();
    }, []);

    // We use a pie chart to visually represent movie visit analytics because it effectively displays the proportion of visits for each movie.
    // Each slice of the pie corresponds to a movie, and the size of the slice represents its proportion of total visits, making it easy to compare movie visit distribution.
    // This visual representation is intuitive and provides a clear understanding of how visits are distributed among different movies.
    const renderPieChart = (movieData) => {
      const canvas = document.getElementById('movieVisitsChart');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const labels = movieData.map((movie) => movie.movieTitle);
        const data = movieData.map((movie) => movie.movieVisits);
  
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels,
            datasets: [
              {
                label: 'Movie Visits',
                data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      }
    };
  
    return (
      <div className="w-full h-full p-4 bg-[#282b2e] rounded-sm flex flex-col text-white justify-between">
        <div className="w-full flex flex-col">
          <div className="mb-4">
            <h2 className="font-bold">Movie Visits</h2>
            <br></br>
            <canvas id="movieVisitsChart" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
    );
  };
  
  export default MovieVisitAnalyticsCard;
  