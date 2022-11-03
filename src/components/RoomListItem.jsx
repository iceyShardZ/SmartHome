import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useState, useEffect } from "react";
import { Consumer } from "./ContextAPI";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home(props) {
  const redirect = useNavigate();
  const location = useLocation();

  return (
    <Consumer>
      {(val) => {
        var thisRoom = val.roomsInTheHouse.filter(
          (p) => p.roomName == props.name
        );
        var color = thisRoom[0].roomColor;
        var colorCode = val.possibleRoomColors.filter(
          (p) => p.colorName == color
        )[0].colorCode;

        return (
          <div className="text App" id="roomDiv">
            <button
              style={{ backgroundColor: colorCode, color: "white" }}
              id="roomButton"
              onClick={() => {
                val.setCurrentRoom(
                  val.roomsInTheHouse.filter((p) => p.roomName == props.name)
                );
                redirect(`/room${props.name}`);
              }}
            >
              {props.name}
            </button>
            <input
              type="image"
              id="roomTrashButton"
              src="./images/icons/Trash.png"
              onClick={() => {
                val.setRoomsInTheHouse(
                  val.roomsInTheHouse.filter((p) => p.roomName != props.name)
                );
              }}
            />
            <br></br>
          </div>
        );
      }}
    </Consumer>
  );
}