import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

export const solidarityGesture = new GestureDescription("solidarity");

// thumb
solidarityGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
solidarityGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  0.75
);
solidarityGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  0.75
);
solidarityGesture.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalRight,
  0.75
);
solidarityGesture.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalLeft,
  0.75
);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  solidarityGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  solidarityGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}
