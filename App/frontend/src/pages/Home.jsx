import axios from "axios"
import { useEffect, useState } from 'react';

function Home() {
    

    // useState hook to initialize the diagnosticData state variable to store the fetched data
  const [diagnosticData, setDiagnosticData] = useState([]);

  // Define a function to fetch diagnostic data from the API
  const fetchDiagnosticData = async () => {
    try {
      // Construct the URL for the API call
      const URL = import.meta.env.VITE_API_URL + 'diagnostic';
      console.log(URL)
      // Use Axios to make the GET request
      const response = await axios.get(URL);
      console.log("data log from home", response)
      // Update state with the response data
      setDiagnosticData(response.data);
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching diagnostic data:', error);
      alert('Error fetching diagnostic data from the server.');
    }
  };

  // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
  useEffect(() => {
    fetchDiagnosticData();
  }, []);

  // Determine content based on diagnosticData length from the fetch action
  let content;
  if (diagnosticData === null) {
    content = <p>Loading diagnostic data...</p>; // Show while data is null
  } else if (diagnosticData.length === 0) {
    content = <p>No diagnostic data found.</p>; // Show if data is an empty array
  } else {
    content = <pre>{JSON.stringify(diagnosticData, null, 2)}</pre>;
  }
    return (
        <>
            <h1>EquiPro Inc</h1>
            <div>
                <p>
                Welcome to our premier horse show management platform, where elegance meets efficiency. Harnessing cutting-edge technology, we seamlessly track attendance and manage bets for horse show enthusiasts worldwide. Whether you're a seasoned professional or a passionate spectator, our platform ensures a thrilling experience, every step of the way. Join us and elevate your horse show journey to new heights.
                </p>
            </div>
            <div>
            <h2>Diagnostic Data</h2>
                {content}
            </div>
        </>
    );
};

export default Home;