import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import Room from "./Room";
import Message from "./Message";
import { useState, useEffect } from "react";
import { Consumer } from "./ContextAPI";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

export default function AddDevice(props) {
  const [deviceName, setDeviceName] = useState("");
  var visibility = "none";

  props.visible ? (visibility = "block") : (visibility = "none");

  return (
    <Consumer>
      {(val) => {
        return (
          <div className="text App" style={{ display: visibility }}>
            <input
              type="text"
              name="deviceName"
              id="deviceNameInput"
              maxLength="23"
              className="field"
              onChange={(e) =>
                setDeviceName(e.target.value.replaceAll(/\s+/g, "-"))
              }
              placeholder="Device name"
            />
            <br></br>
            <select name="deviceType" id="deviceType" className="field">
              {val.possibleDeviceTypes.map((e, i) => {
                return (
                  <option key={i} value={e.typeName}>
                    {e.typeName}
                  </option>
                );
              })}
            </select>
            <br></br>
            <input
              type="image"
              id="addDeviceButton"
              src="./images/icons/AddDevice.png"
              onClick={() => {
                var deviceType = document.getElementById("deviceType").value;
                var alphaNumeric = deviceName.match(/^[-_a-z0-9]+$/gi);
                var under5Devices = val.currentRoom[0].roomContains.length < 5;
                var lessThan1Stereo =
                  val.currentRoom[0].roomContains.filter(
                    (p) => p.deviceType == "stereo"
                  ).length < 1;
                var stereoAvailable = deviceType != "stereo" || lessThan1Stereo;
                var waterHeaterAvailable =
                  deviceType != "waterHeater" ||
                  val.currentRoom[0].roomType == "bathroom";
                var features = () => {
                  switch (deviceType) {
                    case "light":
                      return { onOff: "off", timer: "none" };
                      break;
                    case "stereo":
                      return { onOff: "off", volume: 55, timer: "none" };
                      break;
                    case "AC":
                      return { onOff: "off", temperature: 28, timer: "none" };
                      break;
                    case "waterHeater":
                      return { onOff: "off", timer: 600 };
                      break;

                    default:
                      return { onOff: "off", timer: "none" };
                      break;
                  }
                };

                if (
                  deviceName != "" &&
                  alphaNumeric &&
                  under5Devices &&
                  stereoAvailable &&
                  waterHeaterAvailable
                ) {
                  props.makeInvisible();
                  val.setMessageVisible(false);
                  val.setRoomsInTheHouse(
                    val.roomsInTheHouse.map((p, i) => {
                      if (p.roomName == val.currentRoom[0].roomName) {
                        p.roomContains.push({
                          deviceName: deviceName,
                          deviceType: deviceType,
                          id: p.roomContains.length,
                          features: features(),
                        });
                        /*if (deviceType == "waterHeater") val.updateTimer(val.currentRoom[0].roomName,p.roomContains.length)*/
                      }

                      return p;
                    })
                  );
                } else if (deviceName == "") {
                  val.setMessageVisible(true);
                  val.setMessageText("Device name cannot remain empty.");
                } else if (!alphaNumeric) {
                  val.setMessageVisible(true);
                  val.setMessageText("Device name isn't valid.");
                } else if (!under5Devices) {
                  val.setMessageVisible(true);
                  val.setMessageText(
                    "Cannot have more than 5 devices per room."
                  );
                } else if (!stereoAvailable) {
                  val.setMessageVisible(true);
                  val.setMessageText(
                    "You can only attach one stereo per room."
                  );
                } else if (!waterHeaterAvailable) {
                  val.setMessageVisible(true);
                  val.setMessageText(
                    "WaterHeaters are only available in bathrooms."
                  );
                }
              }}
            />
            <Message />
          </div>
        );
      }}
    </Consumer>
  );
}
/*

&& isNew

var isNew = (val.roomsInTheHouse.filter(p=>p.roomName == roomName).length<1)
*/
