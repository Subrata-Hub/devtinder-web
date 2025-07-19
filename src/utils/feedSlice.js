// import { createSlice } from "@reduxjs/toolkit";

// const feedSlice = createSlice({
//   name: "feed",
//   initialState: {
//     totalUsers: 0,
//     users: null,
//   },
//   reducers: {
//     addFeed: (state, action) => {
//       state.users = action.payload.users;
//     },

//     addTotalUsers: (state, actioon) => {
//       state.totalUsers = actioon.payload.totalUsers;
//     },

//     removeUserFromFeed: (state, action) => {
//       state.users = state.users.filter(
//         (feedId) => feedId._id !== action.payload
//       );

//       // console.log(showFeed);
//       // state.users.push(showFeed);
//     },
//   },
// });

// export const { addFeed, removeUserFromFeed, addTotalUsers } = feedSlice.actions;
// export default feedSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {},
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeUserFromFeed: (state, action) => {
      const users = state?.users.filter(
        (feedId) => feedId._id !== action.payload?._id
      );

      const availableUsers = action.payload.availableUsers;

      const showFeedObj = { users, availableUsers };

      return showFeedObj;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
