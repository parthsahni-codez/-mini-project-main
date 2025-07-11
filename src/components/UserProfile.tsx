import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const DOCTORS = [
  {
    name: 'Dr. Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialty: 'Psychiatrist, Mumbai'
  },
  {
    name: 'Dr. Arjun Mehta',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    specialty: 'Clinical Psychologist, Delhi'
  },
  {
    name: 'Dr. Neha Singh',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    specialty: 'Counselor, Bangalore'
  },
  {
    name: 'Dr. Rohan Patel',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    specialty: 'Therapist, Hyderabad'
  },
  {
    name: 'Dr. Anjali Nair',
    avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    specialty: 'Psychiatrist, Chennai'
  },
  {
    name: 'Dr. Vikram Rao',
    avatar: 'https://randomuser.me/api/portraits/men/49.jpg',
    specialty: 'Clinical Psychologist, Pune'
  }
];

const UserProfile = () => {
  const [doctor, setDoctor] = useState(DOCTORS[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DOCTORS.length);
    setDoctor(DOCTORS[randomIndex]);
  }, []);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar>
          <AvatarImage src={doctor.avatar} alt={doctor.name} />
          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('').slice(0,2)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{doctor.name}</CardTitle>
          <div className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300">Connected Indian Doctor. Reach out for support and guidance anytime!</p>
      </CardContent>
    </Card>
  );
};

export default UserProfile; 