import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchRestaurantsFulfilled } from "../store/restaurantSlice";
import RestaurantCard from "./RestaurantCard";
import sortAscIcon from "../assets/sort-asc.png";
import sortDescIcon from "../assets/sort-desc.png";
import { initMap } from "../helpers/maps";
import Header from "./Header";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import useInitMap from "../hooks/useInitMap";
import useCurrentLocation from "../hooks/useCurrentLocation";
import useScroll from "../hooks/useScroll";
import "./Restaurants.scss";

const Restaurants: React.FC = () => {
  const dispatch = useDispatch();
  const cardRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());
  const location = useCurrentLocation();
  const [sortOrder, setSortOrder] = useState<boolean>();
  const [randomRestaurantIndex, setRandomRestaurantIndex] = useState<number | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const { restaurants, status, error } = useSelector((state: RootState) => state.restaurants);

  useInitMap(location, selectedRestaurantId, setSelectedRestaurantId);

  const sortedRestaurants = [...(restaurants || [])].sort((a, b) => {
    const order = sortOrder ? a.distance - b.distance : b.distance - a.distance;
    return order;
  });

  useScroll(selectedRestaurantId, cardRefs);
  useScroll(randomRestaurantIndex !== null ? sortedRestaurants[randomRestaurantIndex]?.id ?? null : null, cardRefs);

  const pickRandomRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * sortedRestaurants.length);
    setRandomRestaurantIndex(randomIndex);
    setSelectedRestaurantId(sortedRestaurants[randomIndex].id);
  };

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
  }, [location, dispatch, selectedRestaurantId]);

  return (
    <>
      {status === "loading" || !location ? (
        <Loader />
      ) : status === "failed" ? (
        <ErrorMessage error={error || "An unknown error occurred"} />
      ) : (
        <>
          <Header onSurpriseMeClick={pickRandomRestaurant} />
          <div id="map" className="Map"></div>
          <div className="Container">
            <button onClick={() => setSortOrder(!sortOrder)} className="Container__sortButton">
              <img
                className="Container__sortButton--icon"
                src={sortOrder ? sortAscIcon : sortDescIcon}
                alt="Sort Icon"
              />
            </button>
            <ul className="Container__restaurant-list">
              {sortedRestaurants &&
                sortedRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    selectedRestaurantId={selectedRestaurantId}
                    onClick={() => {
                      setSelectedRestaurantId(restaurant.id);
                    }}
                    ref={(element) => cardRefs.current.set(restaurant.id, element)}
                  />
                ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Restaurants;
