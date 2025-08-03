import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Fetch weather from Open-Meteo
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.current_weather) {
              setError('Failed to fetch weather data.');
            } else {
              setWeather(data.current_weather);
              // Reverse geocode to get city name
              fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                .then((res) => res.json())
                .then((locData) => {
                  setLocation(locData.address.city || locData.address.town || locData.address.village || locData.display_name || 'Your Location');
                })
                .catch(() => setLocation('Your Location'));
            }
            setLoading(false);
          })
          .catch(() => {
            setError('Failed to fetch weather data.');
            setLoading(false);
          });
      },
      (geoError) => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  }, []);

  const getWeatherEmoji = (temperature: number) => {
    if (temperature >= 30) return '🌡️';
    if (temperature >= 20) return '☀️';
    if (temperature >= 10) return '🌤️';
    if (temperature >= 0) return '🌥️';
    return '❄️';
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">🌤️ Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Loading weather...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">🌤️ Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">🌤️ Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-3xl mb-2">
            {getWeatherEmoji(weather.temperature)}
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget; 