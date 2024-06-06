import React, { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Reducer function to manage the state updates
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };

    default:
      return state;
  }
};

// Function to initialize state from local storage
const initializeState = () => {
  const savedState = localStorage.getItem("appState");
  return savedState
    ? JSON.parse(savedState)
    : {
        budget: 2000,
        expenses: [
          { id: uuidv4(), name: "Shopping", cost: 50 },
          { id: uuidv4(), name: "Holiday", cost: 300 },
          { id: uuidv4(), name: "Transportation", cost: 70 },
          { id: uuidv4(), name: "Fuel", cost: 40 },
          { id: uuidv4(), name: "Child Care", cost: 500 },
        ],
      };
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  // Sets up the app state with useReducer, initializing from local storage if available
  const [state, dispatch] = useReducer(AppReducer, {}, initializeState);

  // Use useEffect to save the state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  // Returns our context, passing in the values we want to expose
  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// import React, { createContext, useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";

// export const AppReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_EXPENSE":
//       return {
//         ...state,
//         expenses: [...state.expenses, action.payload],
//       };
//     case "DELETE_EXPENSE":
//       return {
//         ...state,
//         expenses: state.expenses.filter(
//           (expense) => expense.id !== action.payload
//         ),
//       };
//     case "SET_BUDGET":
//       return {
//         ...state,
//         budget: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// const initialState = {
//   budget: 2000,
//   expenses: [
//     { id: uuidv4(), name: "Shopping", cost: 50 },
//     { id: uuidv4(), name: "Holiday", cost: 300 },
//     { id: uuidv4(), name: "Transportation", cost: 70 },
//     { id: uuidv4(), name: "Fuel", cost: 40 },
//     { id: uuidv4(), name: "Child Care", cost: 500 },
//   ],
// };

// export const AppContext = createContext();

// export const AppProvider = (props) => {
//   // 4. Sets up the app state. takes a reducer, and an initial state
//   const [state, dispatch] = useReducer(AppReducer, initialState);

//   // 5. Returns our context. Pass in the values we want to expose
//   return (
//     <AppContext.Provider
//       value={{
//         expenses: state.expenses,
//         budget: state.budget,
//         dispatch,
//       }}
//     >
//       {props.children}
//     </AppContext.Provider>
//   );
// };
