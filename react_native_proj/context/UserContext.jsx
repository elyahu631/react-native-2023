import React, { createContext, useState } from 'react';

export const userContext = createContext();

initialUsers = [
  { id: 0, email: 'ely@gmail.com', username: 'elyahu', password: '123' },
  { id: 1, email: 'amit@gmail.com', username: 'amitm', password: '321' },
]

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoggedInId, setUserLoggedInId] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [nextId, setNextId] = useState(initialUsers.length);

  const addUser = (email,username,password) => {
    email = email.toLowerCase();
    let userWithEmailExists = users.find(user=> user.email === email)
    if (userWithEmailExists){
      return -1;
    }
    newUser = {id:nextId,email, username, password}
    newUsers = [...users , newUser]
    setUsers(newUsers);
    setNextId(prev=>prev+1)
    return 1;
  }

  return (
    <userContext.Provider value={{ isLoggedIn, setIsLoggedIn, users, addUser,setUserLoggedInId,userLoggedInId}}>
      {children}
    </userContext.Provider>
  );
};
