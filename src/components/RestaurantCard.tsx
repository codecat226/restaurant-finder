import React, { forwardRef } from "react";
import { Restaurant } from "../store/restaurantSlice";
import star from "../assets/star.png";
import "./RestaurantCard.scss";
interface RestaurantProps {
  restaurant: Restaurant;
  selectedRestaurantId: string | null;
  onClick: (id: string) => void;
}

const RestaurantCard = forwardRef<HTMLLIElement, RestaurantProps>(
  (props, ref) => {
    const { id, distance, name, photo, rating } = props.restaurant;
    return (
      <li
        ref={ref}
        key={id}
        className={`RestaurantCard${
          id === props.selectedRestaurantId ? " RestaurantCard--selected" : ""
        }`}
        onClick={() => props.onClick(id)}
      >
        <div className="RestaurantCard__info">
          <p className="RestaurantCard__info-header">{name}</p>
          <p>{distance.toFixed(2)} km</p>
          <div className="RestaurantCard__info-rating">
            <img
              src={star}
              alt="star-icon"
              className="RestaurantCard__info-icon"
            />
            <p>{rating ? rating : "No rating found"}</p>
          </div>
        </div>
        {photo && (
          <img src={photo} alt={name} className="RestaurantCard__image" />
        )}
      </li>
    );
  }
);

export default RestaurantCard;
