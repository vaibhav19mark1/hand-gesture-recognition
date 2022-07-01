import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import thumbs_up from "./emogis/thumbs_up.png";
import victory from "./emogis/victory.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: thumbs_up, victory: victory };

  const runHandPose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    //Check if data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //Detect hand
      const hand = await net.estimateHands(video);
      console.log(hand);

      // Detect gesture
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 8);
        console.log(gesture);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // const confidence = gesture.gestures.map(
          //   (prediction) => prediction.confidence
          // );
          // const maxConfidence = confidence.indexOf(
          //   Math.max.apply(null, confidence)
          // );
          setEmoji(gesture.gestures[0].name);
          console.log(emoji);
        }
      }

      //Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };
  useEffect(()=>{runHandPose()});
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        
        {/* Display emoji */}
        {emoji !== null ? (
          <img
            src={images[emoji]}
            alt=""
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
