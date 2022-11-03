import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useState, useEffect } from "react";
import { Consumer } from "./ContextAPI";

export default function Device(props) {
  return (
    <Consumer>
      {(val) => {
        return (
          <div className="text App">
            <div
              id="msgDiv"
              style={{ display: val.messageVisible ? "block" : "none" }}
            >
              <h1 id="msgText">{val.messageText}</h1>

              <input
                type="image"
                id="OK"
                src="./images/icons/OK2.png"
                onClick={() => {
                  val.setMessageVisible(!val.messageVisible);
                }}
              />
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}
