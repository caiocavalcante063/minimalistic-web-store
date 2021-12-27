import { CURRENCY_SWITCH } from "../actions";

const INITIAL_STATE = {
  currency: "USD",
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCY_SWITCH:
      return {
        ...state,
        currency: action.currency,
      };

    default:
      return state;
  }
};

export default currencyReducer;
