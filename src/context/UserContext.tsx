"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// {"results":[{"gender":"male","name":{"title":"Mr","first":"Jim","last":"Lewis"},"location":{"street":{"number":6888,"name":"Washington Ave"},"city":"Dayton","state":"South Carolina","country":"United States","postcode":72290,"coordinates":{"latitude":"-10.9036","longitude":"-4.5571"},"timezone":{"offset":"+7:00","description":"Bangkok, Hanoi, Jakarta"}},"email":"jim.lewis@example.com","login":{"uuid":"88dbf3cb-12a3-4910-adb4-d0e21e26b4b2","username":"sadfish849","password":"smithers","salt":"eiNmMecA","md5":"aed0c63a1874dc1b7158f8ae45c253fe","sha1":"56119fb1b51fe18bc612105a3a2f9ea3c96bed0f","sha256":"45c70330bc51a10c13aefdfc25888bb35d42693fca184890835ec6f988de407b"},"dob":{"date":"1946-11-20T19:33:35.952Z","age":78},"registered":{"date":"2020-05-09T17:05:38.329Z","age":5},"phone":"(291) 572-7187","cell":"(984) 825-7539","id":{"name":"SSN","value":"317-83-3030"},"picture":{"large":"https://randomuser.me/api/portraits/men/15.jpg","medium":"https://randomuser.me/api/portraits/med/men/15.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/15.jpg"},"nat":"US"}],"info":{"seed":"c70304f9c32285b5","results":1,"page":1,"version":"1.4"}}
export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};