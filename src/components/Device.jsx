import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useState, useEffect } from "react";
import { Consumer } from "./ContextAPI";

export default function Device(props) {
  return (
    <Consumer>
      {(val) => {
        var features = val.roomsInTheHouse
          .filter((e) => e.roomName == val.currentRoom[0].roomName)[0]
          .roomContains.filter((e) => e.id == props.id)[0].features;

        if (features.timer > 0 && features.onOff != "on") {
          val.updateFeatures(
            val.currentRoom[0].roomName,
            props.id,
            "onOff",
            "on"
          );
        }
        if (features.timer < 1 && features.onOff != "off") {
          val.updateFeatures(
            val.currentRoom[0].roomName,
            props.id,
            "onOff",
            "off"
          );
        }

        var onOffValue =
          features.onOff == "on"
            ? "./images/icons/On.png"
            : "./images/icons/Off.png";
        return (
          <div className="text App">
            <br></br>
            <div id="deviceDiv">
              <input
                type="image"
                id="deviceTrashButton"
                src="./images/icons/Trash.png"
                onClick={() => {
                  val.setRoomsInTheHouse(
                    val.roomsInTheHouse.map((p) => {
                      if (p.roomName == val.currentRoom[0].roomName)
                        p.roomContains = p.roomContains.filter(
                          (e, i) => e.id != props.id
                        );
                      return p;
                    })
                  );
                }}
              />
              <br></br>
              <h3>{props.name}</h3>
              <h6 id="deviceTypeText">{props.type}</h6>

              <div id="deviceProperties">
                <input
                  type="image"
                  id="onOff"
                  src={onOffValue}
                  style={{
                    color: "white",
                    filter:
                      features.onOff == "on"
                        ? "brightness(100%)"
                        : "brightness(50%)",
                  }}
                  onClick={() => {
                    if (features.timer == "none") {
                      if (features.onOff == "off") {
                        val.updateFeatures(
                          val.currentRoom[0].roomName,
                          props.id,
                          "onOff",
                          "on"
                        );
                      } else {
                        val.updateFeatures(
                          val.currentRoom[0].roomName,
                          props.id,
                          "onOff",
                          "off"
                        );
                      }
                    }
                  }}
                />

                <div
                  id="volumeDiv"
                  style={{ display: features.volume ? "inline-block" : "none" }}
                >
                  <input
                    type="button"
                    id="volume"
                    value={"Volume:   " + (Number(features.volume) - 1)}
                  />
                  <input
                    type="image"
                    id="miniPlus"
                    src="./images/icons/MiniPlus.png"
                    onClick={() => {
                      if (features.volume < 101)
                        val.updateFeatures(
                          val.currentRoom[0].roomName,
                          props.id,
                          "volume",
                          features.volume + 1
                        );
                    }}
                  />

                  <input
                    type="image"
                    id="miniMinus"
                    src="./images/icons/MiniMinus.png"
                    onClick={() => {
                      if (features.volume > 1)
                        val.updateFeatures(
                          val.currentRoom[0].roomName,
                          props.id,
                          "volume",
                          features.volume - 1
                        );
                    }}
                  />
                </div>
                <div
                  id="temperatureDiv"
                  style={{
                    display: features.temperature ? "inline-block" : "none",
                  }}
                >
                  <input
                    type="button"
                    id="temperature"
                    value={"temperature:   " + features.temperature}
                  />

                  <input
                    type="image"
                    id="miniPlus"
                    src="./images/icons/MiniPlus.png"
                    onClick={() => {
                      if (features.temperature < 36)
                        val.updateFeatures(
                          val.currentRoom[0].roomName,
                          props.id,
                          "temperature",
                          features.temperature + 1
                        );
                    }}
                  />

                  <input
                    type="image"
                    id="miniMinus"
                    src="./images/icons/MiniMinus.png"
                    onClick={() => {
                      if (features.temperature > 16)
                        val.updateFeatures(
                          val.currentRoom[0].roomName,
                          props.id,
                          "temperature",
                          features.temperature - 1
                        );
                    }}
                  />
                </div>
                <div
                  id="timerDiv"
                  style={{
                    display: features.timer != "none" ? "inline-block" : "none",
                  }}
                >
                  <input
                    type="button"
                    id="timer"
                    value={`timer:  ${Math.floor(features.timer / 60)} : ${
                      features.timer % 60
                    }`}
                  />

                  <input
                    type="image"
                    id="miniPlus"
                    src="./images/icons/MiniPlus.png"
                    onClick={() => {
                      val.updateFeatures(
                        val.currentRoom[0].roomName,
                        props.id,
                        "timer",
                        features.timer + 600
                      );
                    }}
                  />

                  <input
                    type="image"
                    id="miniMinus"
                    src="./images/icons/MiniMinus.png"
                    onClick={() => {
                      val.updateFeatures(
                        val.currentRoom[0].roomName,
                        props.id,
                        "timer",
                        features.timer - Math.floor(features.timer / 10)
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}
