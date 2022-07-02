import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

export const stopGesture = new GestureDescription("stop");

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
    stopGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
    stopGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  }