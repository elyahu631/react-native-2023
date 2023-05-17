import React, { createContext, useState } from 'react';
export const rideContext = createContext();

initialRides = [
    { userId: 1, id: 0, seats: 2, from: 'נתניה', to: 'אילת', note: 'אין' },
    { userId: 0, id: 1, seats: 3, from: 'צורן', to: 'נהריה', note: 'אין' },
    { userId: 0, id: 2, seats: 3, from: 's', to: 'g', note: 'אין' },

]

export const RidesContextProvider = ({ children }) => {
    const [rides, setRides] = useState(initialRides);
    const [nextId, setNextId] = useState(initialRides.length);

    const addRide = (userId, seats, from, to, note) => {
        newRide = { id: nextId, userId, seats, from, to, note }
        newRides = [...rides, newRide]
        setRides(newRides);
        setNextId(prev => prev + 1)
    }

    return (
        <rideContext.Provider value={{ rides, addRide }}>
            {children}
        </rideContext.Provider>
    );
};
