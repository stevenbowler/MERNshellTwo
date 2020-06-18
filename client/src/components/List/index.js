//@ts-check
/**@module */
import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

/**@function List */
export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

/**@function ListItem */
export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}


/**
 * This Link component replaces the react-router-dom version, throws deprecation warning
 * @function Link
 * @param {*} href
*/export function Link({ to, children }) {
  return (
    <a
      href={to}
    >
      {children}
    </a>
  );
}
