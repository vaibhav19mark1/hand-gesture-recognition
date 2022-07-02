import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

export const thumbsDownGesture = new GestureDescription('thumbs_down');

thumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);

thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);

// do this for all other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    thumbsDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    thumbsDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  }