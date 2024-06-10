import React from "react";
import "./Header.scss";

interface HeaderProps {
  onSurpriseMeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSurpriseMeClick }) => {
  return (
    <div className="HeaderContainer">
      <h1 className="HeaderContainer__header">Restaurant Finder</h1>
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        tempore fugiat fuga nisi hic cumque ex numquam sed voluptatem.
        Architecto aliquid nulla asperiores amet mollitia fugiat odit nihil
        recusandae suscipit!
      </h2>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        tempore fugiat fuga nisi hic cumque ex numquam sed voluptatem.
        Architecto aliquid nulla asperiores amet mollitia fugiat odit nihil
        recusandae suscipit!
      </h3>
      <button className="HeaderContainer__button" onClick={onSurpriseMeClick}>Surprise me!</button>
    </div>
  );
};

export default Header;
