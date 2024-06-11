import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import { getTotalTicketsPerDay } from "app/queries/booking-queries";

const TicketAnalyticsCard = () => {
  const [dates, setDates] = useState([""]);
  const [totalTickets, setTotalTickets] = useState({});
  const [chartInstance, setChartInstance] = useState(null);
  const chartCanvasRef = useRef(null);

  const handleDateChange = (index, value) => {
    const updatedDates = [...dates];
    updatedDates[index] = value;

    if (index > 0 && new Date(value) < new Date(dates[index - 1])) {
      updatedDates[index] = dates[index - 1];
    }

    setDates(updatedDates);
    handleGenerateVisualization(updatedDates); // Update the chart when date is changed
  };

  const handleAddDate = () => {
    setDates([...dates, ""]);
  };

  const handleRemoveDate = (index) => {
    if (dates.length > 1) {
      const updatedDates = dates.filter((_, i) => i !== index);
      setDates(updatedDates);
    }
    handleGenerateVisualization(dates); // Update the chart when date is removed
  };

  // We use a line chart to visually represent ticket analytics because it effectively illustrates the trend of ticket sales over time.
  // The continuous line in the chart provides a clear and intuitive representation of how ticket sales have evolved, allowing for easy identification of patterns, trends, and fluctuations.
  // This visual representation is particularly useful for understanding ticket sales trends and making informed decisions based on the historical ticket sales data.
  
  const handleGenerateVisualization = async (updatedDates) => {
    const totalTickets = {};
    for (const date of updatedDates) {
      if (date) {
        const totalTicketsPerDayData = await getTotalTicketsPerDay(date);
        totalTickets[date] = totalTicketsPerDayData;
      }
    }
    setTotalTickets(totalTickets);

    const nonNullTickets = updatedDates.filter((date) => totalTickets[date] !== null);
    const chartData = {
      labels: nonNullTickets,
      datasets: [
        {
          label: "Tickets Sold",
          data: nonNullTickets.map((date) => totalTickets[date]),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    if (chartInstance) {
      chartInstance.data = chartData;
      chartInstance.update();
    } else {
      const canvas = chartCanvasRef.current;
      const newChartInstance = new Chart(canvas, {
        type: "line",
        data: chartData,
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Tickets Sold",
              },
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  };

  return (
    <div className="w-full h-full p-4 bg-[#282b2e] rounded-sm flex flex-col text-white justify-between">
      <div className="w-full flex flex-col">
        <h2 className="font-bold">Ticket Per Day Visualization</h2>
        <br />
        <div className="flex flex-col items-left mb-2">
          {dates.map((date, index) => (
            <div key={index} className="flex items-left justify-center mb-2">
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                className="text-black"
              />
              <br />
              {dates.length > 1 && (
                <button
                  onClick={() => handleRemoveDate(index)}
                  className="bg-red-500 text-white p-1 rounded text-sm"
                >
                  Remove
                </button>
              )}
              <br />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mb-2">
          <button
            onClick={handleAddDate}
            className="bg-blue-500 text-white p-2 rounded w-32"
          >
            Add Date
          </button>
          <br />
        </div>
      </div>
      <br />
      <div>
        <canvas ref={chartCanvasRef} width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default TicketAnalyticsCard;
