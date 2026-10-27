'use client';

import { useState, useEffect } from 'react';

const mockProfiles = [
  {
    id: 1,
    name: 'Amina W.',
    age: 26,
    county: 'Nairobi',
    bio: 'Love hiking Ngong Hills and good coffee in Westlands. Looking for genuine connection.',
    interests: ['Travel', 'Music', 'Food'],
    distance: '3.2 km',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    id: 2,
    name: 'Brian K.',
    age: 29,
    county: 'Kiambu',
    bio: 'Software engineer by day, football fan by night. From Ruiru.',
    interests: ['Sports', 'Tech', 'Movies'],
    distance: '12 km',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: 3,
    name: 'Faith M.',
    age: 24,
    county: 'Mombasa',
    bio: 'Coastal vibes only. Beach walks and Swahili food. Visiting Nairobi this weekend!',
    interests: ['Beach', 'Cooking', 'Dance'],
    distance: '480 km',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  },
  {
    id: 4,
    name: 'David O.',
    age: 31,
    county: 'Kisumu',
    bio: 'Teacher and part-time photographer. Love Lake Victoria sunsets.',
    interests: ['Photography', 'Nature', 'Reading'],
    distance: '350 km',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  }
];

export default function Home() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [location, setLocation] = useState('Requesting location...');
  const [countyFilter, setCountyFilter] = useState('All');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`Lat: ${pos.coords.latitude.toFixed(2)}, Lon: ${pos.coords.longitude.toFixed(2)} (near you)`);
        },
        () => setLocation('Location permission denied - showing all Kenya profiles')
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  const filtered = countyFilter === 'All' 
    ? profiles 
    : profiles.filter(p => p.county === countyFilter);

  const counties = ['All', ...new Set(mockProfiles.map(p => p.county))];

  return (
    <div className="container">
      <header>
        <h1>KenyaConnect</h1>
        <p>Location-based dating for Kenyans — meet nearby people</p>
        <p style={{marginTop: '10px', fontSize: '0.95rem'}}>Your location: {location}</p>
      </header>

      <div className="filters">
        <label>Filter by County: </label>
        <select value={countyFilter} onChange={(e) => setCountyFilter(e.target.value)}>
          {counties.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="profiles">
        {filtered.map(profile => (
          <div key={profile.id} className="card">
            <img src={profile.photo} alt={profile.name} className="profile-img" />
            <h3>{profile.name}, {profile.age}</h3>
            <p><strong>{profile.county}</strong> • {profile.distance}</p>
            <p style={{margin: '10px 0', color: '#555'}}>{profile.bio}</p>
            <p>Interests: {profile.interests.join(', ')}</p>
            <button onClick={() => alert(`Liked ${profile.name}! In a full app this would create a match if mutual.`)}>Like</button>
          </div>
        ))}
      </div>

      <div style={{textAlign: 'center', color: 'white', padding: '40px 0'}}>
        <p>This is a starter demo. Full features (auth, real matching, chat, M-Pesa, etc.) coming next.</p>
        <p>Built for Kenya — support for Nairobi, Mombasa, Kisumu, Kiambu and more.</p>
      </div>
    </div>
  );
}