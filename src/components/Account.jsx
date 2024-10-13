import React, { useState } from 'react';
import Timer from './Timer'; // Import the Timer component
import Logout from './Logout'; // Import the Logout component

function Account({ user }) {
    const [activities, setActivities] = useState([]); // State to hold activities
    const [activityName, setActivityName] = useState('');
    const [timeTaken, setTimeTaken] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Format the date for the date input

    const handleActivityEnd = async (totalTime) => {
        setTimeTaken(totalTime); // Set the time taken from the timer

        // Prepare the activity data to be sent to the server
        const activityData = {
            username: user?.username,
            activityName: activityName,
            timeTaken: `${totalTime.hours}h ${totalTime.minutes}m ${totalTime.seconds}s`,
            date: date,
        };

        try {
            const response = await fetch(`${process.env.VITE_SERVER_URL}/activities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });

            if (response.ok) {
                const newActivity = await response.json();
                // Add the new activity to the state
                setActivities([...activities, { ...activityData, number: activities.length + 1 }]);
                setActivityName(''); // Clear the activity name
            } else {
                console.error('Failed to add activity');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // This submit handler isn't necessary for your flow,
        // since activities are added via `handleActivityEnd`.
    };

    return (
        <div>
            <h1>Your Account</h1>
            <p>Username: {user?.username}</p>

            <h2>Activity Log</h2>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label>Date: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <button type="submit">Add Activity</button>
            </form>

            <Timer onActivityEnd={handleActivityEnd} />

            <h2>Activity Table</h2>
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
                    {activities.map((activity) => (
                        <tr key={activity.number}>
                            <td>{activity.number}</td>
                            <td>{activity.activityName}</td>
                            <td>{activity.timeTaken}</td>
                            <td>{activity.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Logout />
        </div>
    );
}

export default Account;
