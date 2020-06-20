//@ts-check
/**@module 
 * @requires react
*/
import React from "react";

// This file exports the Input, TextArea, and FormBtn components
/**
 * Create Input tag with form-group class
 * @function Input
 * @param {*} props 
 */
export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

/**
 * @function TextArea
 * @param {*} props 
 */
export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="5" {...props} />
    </div>
  );
}

/**
 * Create FormBtn tag with varioues attributes
 * @function FormBtn
 * @param {*} props 
 */
export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
