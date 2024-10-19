import React, { useState, useEffect } from 'react';
import Timer from './Timer'; // Import the Timer component
import Logout from './Logout'; // Import the Logout component

function Account({ user }) {

    // If user is not passed down, try fetching from localStorage
    if (!user) {
        const storedUser = localStorage.getItem('user');
        user = storedUser ? JSON.parse(storedUser) : null;
    }

    const [activities, setActivities] = useState([]); // State to hold activities
    const [activityName, setActivityName] = useState('');
    const [timeTaken, setTimeTaken] = useState({ hours: 0, minutes: 0, seconds: 0 });

    // Fetch activities when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/activities?username=${user?.username}`);
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data); // Set the fetched activities in the state
                } else {
                    console.error('Failed to fetch activities');
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        if (user) {
            fetchActivities();
        }
    }, [user]); // Only run the effect when the `user` is available

    const handleActivityEnd = async (totalTime) => {
        setTimeTaken(totalTime); // Set the time taken from the timer

        // Get the current date when the activity ends
        const currentDate = new Date().toISOString().split('T')[0]; // Format the current date

        // Prepare the activity data to be sent to the server
        const activityData = {
            username: user?.username,
            activityName: activityName,
            timeTaken: `${totalTime.hours}h ${totalTime.minutes}m ${totalTime.seconds}s`,
            date: currentDate, // Use the current date here
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/activities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });

            if (response.ok) {
                const newActivity = await response.json();
                // Fetch updated activities from the server after adding a new one
                const updatedResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/activities?username=${user?.username}`);
                const updatedActivities = await updatedResponse.json();
                setActivities(updatedActivities); // Update the state with fetched activities
                setActivityName(''); // Clear the activity name
            } else {
                console.error('Failed to add activity');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Your Account</h1>
            <p>Username: {user?.username}</p>
            <div className="card">
                <h2>Activity Log</h2>
                <form>
                    <div>
                        <label>Activity Number: </label>
                        <input type="text" value={activities.length + 1} readOnly />
                    </div>
                    <div>
                        <label>Activity Name: </label>
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Time Taken: </label>
                        <input
                            type="text"
                            value={`${timeTaken.hours}h ${timeTaken.minutes}m ${timeTaken.seconds}s`}
                            readOnly
                        />
                    </div>
                </form>
            </div>
            <Timer onActivityEnd={handleActivityEnd} />

            <h2>Activity Table</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Activity Number</th>
                            <th>Activity Name</th>
                            <th>Time Taken</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{activity.activityName}</td>
                            <td>{activity.timeTaken}</td>
                            <td>{activity.date}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <Logout />
        </div>
    );
}

export default Account;
