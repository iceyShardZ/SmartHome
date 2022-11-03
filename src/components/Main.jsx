import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import Create from "./Create";
import Room from "./Room";
import RoomListItem from "./RoomListItem";
import { useState, useEffect } from "react";
import { Consumer } from "./ContextAPI";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateEditView(props) {
  const redirect = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      props.setRoom([{ roomName: "noneSelected", roomContains: [] }]);
    }
  }, [location.pathname]);

  const [roomCreatorVisibility, setroomCreatorVisibility] = useState(false);

  var plusButtonId = roomCreatorVisibility ? "xButton" : "bigPlusButton";

  const makeCreatePopUpInvisible = () => {
    setroomCreatorVisibility((roomCreatorVisibility) => false);
  };

  return (
    <Consumer>
      {(val) => {
        return (
          <div className="text App">
            {val.roomsInTheHouse.length < 1 ? "Create your first room!" : ""}
            <br></br>
            <input
              type="image"
              id={plusButtonId}
              src="./images/icons/Plus.png"
              onClick={() => {
                setroomCreatorVisibility(
                  (roomCreatorVisibility) => !roomCreatorVisibility
                );
              }}
            />
            <Create
              visible={roomCreatorVisibility}
              makeInvisible={makeCreatePopUpInvisible}
            />
            <br></br>
            <br></br>
            {val.roomsInTheHouse.map((p, i) => {
              return <RoomListItem name={p.roomName} key={i} />;
            })}
          </div>
        );
      }}
    </Consumer>
  );
}