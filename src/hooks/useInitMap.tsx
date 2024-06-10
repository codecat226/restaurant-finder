import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRestaurantsFulfilled } from "../store/restaurantSlice";
import { initMap } from "../helpers/maps";

const useInitMap = (location: { lat: number; lng: number } | null, selectedRestaurantId: string | null, setSelectedRestaurantId: (id: string | null) => void) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      initMap(
        location,
        (fetchedRestaurants) => {
          dispatch(fetchRestaurantsFulfilled(fetchedRestaurants));
        },
        (restaurantId) => {
          setSelectedRestaurantId(restaurantId);
        },
        selectedRestaurantId
      );
    }
  }, [location, dispatch, selectedRestaurantId, setSelectedRestaurantId]);
};

export default useInitMap;
