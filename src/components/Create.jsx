import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import Room from "./Room";
import Message from "./Message";
import "../App.css";
import { useState, useEffect } from "react";
import { Consumer } from "./ContextAPI";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

export default function Home(props) {
  const [roomName, setroomName] = useState("");
  var visibility = "none";

  props.visible ? (visibility = "block") : (visibility = "none");

  return (
    <Consumer>
      {(val) => {
        return (
          <div className="text App" style={{ display: visibility }}>
            <input
              type="text"
              name="roomName"
              id="roomNameInput"
              maxLength="14"
              className="field"
              onChange={(e) =>
                setroomName(e.target.value.replaceAll(/\s+/g, "-"))
              }
              placeholder="Room name"
            />
            <br></br>
            <select name="roomType" id="roomType" className="field">
              {val.possibleRoomTypes.map((e, i) => {
                return (
                  <option key={i} value={e.typeName}>
                    {e.typeName}
                  </option>
                );
              })}
            </select>
            <br></br>
            <select name="roomColor" id="roomColor" className="field">
              {val.possibleRoomColors.map((e, i) => {
                return (
                  <option key={i} value={e.colorName}>
                    {e.colorName}
                  </option>
                );
              })}
            </select>
            <br></br>
            <input
              type="image"
              id="createRoomButton"
              src="./images/icons/CreateRoom.png"
              onClick={() => {
                var roomType = document.getElementById("roomType").value;
                var roomColor = document.getElementById("roomColor").value;
                var isNew =
                  val.roomsInTheHouse.filter((p) => p.roomName == roomName)
                    .length < 1;
                var routesAmount = val.roomRoutesArray.length;

                if (
                  roomName != "" &&
                  roomName.match(/^[-_a-z0-9]+$/gi) &&
                  isNew
                ) {
                  props.makeInvisible();
                  val.setMessageVisible(false);
                  val.setRoomsInTheHouse([
                    {
                      roomName: roomName,
                      roomType: roomType,
                      roomColor: roomColor,
                      roomPic: "path",
                      roomContains: [],
                    },
                    ...val.roomsInTheHouse,
                  ]);
                  val.roomRoutesArray.push(
                    <Route
                      key={routesAmount}
                      path={"/room" + roomName}
                      element={<Room name={roomName} />}
                    />
                  );
                } else if (roomName == "") {
                  val.setMessageVisible(true);
                  val.setMessageText("Room name can't remain empty");
                } else if (!roomName.match(/^[-_a-z0-9]+$/gi)) {
                  val.setMessageVisible(true);
                  val.setMessageText(
                    "Room name isn't Valid, try to remove special characters."
                  );
                } else if (!isNew) {
                  val.setMessageVisible(true);
                  val.setMessageText("A room already exists with this name");
                }
              }}
            />
            <br></br>
            <br></br>
            <Message />
          </div>
        );
      }}
    </Consumer>
  );
}
