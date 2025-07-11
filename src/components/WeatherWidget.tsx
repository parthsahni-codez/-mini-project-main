import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Sun, Cloud, CloudRain, CloudSnow, CloudSun, Loader2, AlertTriangle } from 'lucide-react';

const getWeatherIcon = (code: number) => {
  // Open-Meteo weather codes: https://open-meteo.com/en/docs#api_form
  if (code === 0) return <Sun className="w-8 h-8 text-yellow-400" />; // Clear
  if ([1, 2, 3].includes(code)) return <CloudSun className="w-8 h-8 text-yellow-300" />; // Mainly clear, partly cloudy
  if ([45, 48].includes(code)) return <Cloud className="w-8 h-8 text-gray-400" />; // Fog
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain className="w-8 h-8 text-blue-400" />; // Rain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow className="w-8 h-8 text-blue-200" />; // Snow
  return <Cloud className="w-8 h-8 text-gray-400" />; // Default
};

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

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weather</CardTitle>
        {weather && getWeatherIcon(weather.weathercode)}
        {loading && <Loader2 className="w-6 h-6 animate-spin text-gray-400" />}
        {error && <AlertTriangle className="w-6 h-6 text-red-400" />}
      </CardHeader>
      <CardContent>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-500 text-sm">{error}</div>}
        {weather && !loading && !error && (
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">{location}</div>
            <div className="text-2xl">{Math.round(weather.temperature)}°C</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Wind: {weather.windspeed} km/h</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget; 