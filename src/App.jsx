import "./App.css";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import Room from "./components/Room";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./components/ContextAPI";
import {BrowserRouter as Router,Route,Routes,Link,useNavigate,useLocation,} from "react-router-dom";

function App() {
  const [possibleRoomTypes, setPossibleRoomTypes] = useState([
    { typeName: "bedroom", typePic: "path", Exclusive: "none" },
    { typeName: "bathroom", typePic: "path", Exclusive: "waterHeater" },
    { typeName: "kitchen", typePic: "path", Exclusive: "none" },
    { typeName: "livingroom", typePic: "path", Exclusive: "none" },
    { typeName: "other", typePic: "path", Exclusive: "none" },
  ]);
  const [possibleDeviceTypes, setPossibleDeviceTypes] = useState([
    { typeName: "AC", typeIcon: "path" },
    { typeName: "light", typeIcon: "path" },
    { typeName: "stereo", typeIcon: "path" },
    { typeName: "waterHeater", typeIcon: "path" },
    { typeName: "other", typeIcon: "path" },
  ]);
  const [possibleRoomColors, setPossibleRoomColors] = useState([
    { colorName: "blue", colorCode: "#4d629c" },
    { colorName: "lightslategray", colorCode: "lightslategray" },
    { colorName: "green", colorCode: "#22cc93" },
    { colorName: "redpink", colorCode: "#d6375f" },
    { colorName: "purple", colorCode: "#8362a3" },
  ]);
  const [roomsInTheHouse, setRoomsInTheHouse] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [roomRoutesArray, setroomRoutesArray] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageText, setMessageText] = useState("");

  const updateFeatures = (roomName, deviceId, feature, value) => {
    var featureUpdated =
      roomsInTheHouse
        .filter((e) => e.roomName == roomName)[0]
        .roomContains.filter((e) => e.id == deviceId)[0].features[feature] == value;

    if (!featureUpdated) {
      setRoomsInTheHouse((roomsInTheHouse) =>
        roomsInTheHouse.map((p) => {
          if (p.roomName == roomName) {
            p.roomContains = p.roomContains.map((e) => {
              if (e.id == deviceId) {
                if (e.features[feature] != value) e.features[feature] = value;
              }
              return e;
            });
          }
          return p;
        })
      );
    }
  };

  const [appValuesObj, setAppValuesObj] = useState({
    possibleRoomTypes: possibleRoomTypes,
    possibleDeviceTypes: possibleDeviceTypes,
    possibleRoomColors: possibleRoomColors,
    roomsInTheHouse: roomsInTheHouse,
    setRoomsInTheHouse: setRoomsInTheHouse,
    currentRoom: currentRoom,
    setCurrentRoom: setCurrentRoom,
    roomRoutesArray: roomRoutesArray,
    updateFeatures: updateFeatures,
    messageVisible: messageVisible,
    setMessageVisible: setMessageVisible,
    messageText: messageText,
    setMessageText: setMessageText,
  });

  useEffect(() => {
    setAppValuesObj({
      possibleRoomTypes: possibleRoomTypes,
      possibleDeviceTypes: possibleDeviceTypes,
      possibleRoomColors: possibleRoomColors,
      roomsInTheHouse: roomsInTheHouse,
      setRoomsInTheHouse: setRoomsInTheHouse,
      currentRoom: currentRoom,
      setCurrentRoom: setCurrentRoom,
      setAppObj: setAppValuesObj,
      roomRoutesArray: roomRoutesArray,
      updateFeatures: updateFeatures,
      messageVisible: messageVisible,
      setMessageVisible: setMessageVisible,
      messageText: messageText,
      setMessageText: setMessageText,
    });
  }, [
    roomsInTheHouse,
    currentRoom,
    roomRoutesArray,
    messageVisible,
    messageText,
  ]);

  const setTheCurrentRoom = (r) => {
    setCurrentRoom(r);
  };

  roomsInTheHouse.forEach((e) =>
    e.roomContains.forEach((e) => {
      if (e.deviceType == "waterHeater");
    })
  );

  const [ticker, setTicker] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTicker((ticker) => !ticker);
      roomsInTheHouse.forEach((e) =>
        e.roomContains.forEach((e) => {
          if (e.deviceType == "waterHeater")
            e.features.timer -= e.features.timer > 0 ? 1 : 0;
        })
      );
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [ticker]);

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <Router>
        <br></br>
        <Link to="/" className="Link">
          <img id="logo" src="./images/icons/Logo.png" />
        </Link>
        <Provider value={appValuesObj}>
          <Routes>
            <Route path="/" element={<Main setRoom={setTheCurrentRoom} />} />
            {roomRoutesArray}
          </Routes>
        </Provider>
      </Router>
      <div id="downspace"></div>
    </div>
  );
}

export default App;
