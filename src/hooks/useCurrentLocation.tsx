import { useState, useEffect } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setLocation(userLocation);
    });
  }, []);

  return location;
};

export default useCurrentLocation;
