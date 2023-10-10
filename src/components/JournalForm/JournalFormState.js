export const INITIAL_STATE = {
  isValid: {
    title: true,
    text: true,
    date: true,
  },
  values: {
    title: "",
    text: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

// первый аргумент - предыдущее состояние, второй - action, то есть то, что нужно сделать (имеет тип и payload - дополнительные данные)
// проверка на тип происходит через switch
export const formReducer = (state, action) => {
  switch (action.type) {
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const titleValidity = action.payload.title?.trim().length;
      const textValidity = action.payload.text?.trim().length;
      const dateValidity = action.payload.date;
      return {
        values: action.payload,
        isValid: { title: titleValidity, text: textValidity, date: dateValidity },
        isFormReadyToSubmit: titleValidity && textValidity && dateValidity,
      };
    }
    case "CLEAR": {
      return { ...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false };
    }
    case "SET_VALUE":
      return { ...state, values: { ...state.values, ...action.payload } };
  }
};
