import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import AddDevice from "./AddDevice";
import Device from "./Device";
import { useState, useEffect } from "react";
import { Consumer } from "./ContextAPI";
import { useNavigate, useLocation } from "react-router-dom";

export default function Room(props) {
  const redirect = useNavigate();
  const location = useLocation();

  const [deviceCreatorVisibility, setDeviceCreatorVisibility] = useState(false);

  var plusButtonId = deviceCreatorVisibility ? "xButton" : "bigPlusButton";

  const makeCreatePopUpInvisible = () => {
    setDeviceCreatorVisibility((deviceCreatorVisibility) => false);
  };

  var nothing = "nothing";
  return (
    <Consumer>
      {(val) => {
        /*
        if (val.currentRoom[0].roomName !=  location.pathname.slice(5)){
            val.setCurrentRoom(val.roomsInTheHouse.filter(p=>p.roomName == props.name));
        }*/

        return (
          <div className="text App" id="roomDiv">
            <br></br>
            <h1 id="roomTitle">{val.currentRoom[0].roomName}</h1>
            <h6 id="roomType">Type: {val.currentRoom[0].roomType}</h6>
            <input
              type="image"
              id={plusButtonId}
              src="./images/icons/Plus.png"
              onClick={() => {
                setDeviceCreatorVisibility(
                  (deviceCreatorVisibility) => !deviceCreatorVisibility
                );
              }}
            />
            <AddDevice
              visible={deviceCreatorVisibility}
              makeInvisible={makeCreatePopUpInvisible}
            />
            {val.currentRoom[0].roomContains.map((p, i) => {
              var features = val.roomsInTheHouse
                .filter((e) => e.roomName == val.currentRoom[0].roomName)[0]
                .roomContains.filter((e) => e.id == p.id)[0].features;

              return (
                <Device
                  name={p.deviceName}
                  type={p.deviceType}
                  key={i}
                  id={p.id}
                  UpdateTimer={val.updateFeatures}
                  roomName={val.currentRoom[0].roomName}
                  features={features}
                />
              );
            })}
          </div>
        );
      }}
    </Consumer>
  );
}
