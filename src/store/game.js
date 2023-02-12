//Redux
// import { useEffect } from "react";
// import Redux from "@reduxjs/toolkit";

// const START = "START";

// const initPlay = {
//   isOn: false,
//   isDisplay: false,
//   displayColors: [],
//   scores: 0,
//   userColors: [],
//   userPlay: false,
// };

// const gameReducer = (state = initPlay, action) => {
//   switch (action.type) {
//     case START:
//       return {
//         ...state,
//         isOn: true,
//         isDisplay: true,
//       };
//     default:
//       return state;
//   }
// };

// const handleStart = () => {
//   return {
//     type: START,
//   };
// };

// const store = Redux.configureStore(gameReducer);
