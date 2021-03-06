import { CURRENCY_SWITCH } from "../actions";

const INITIAL_STATE = {
  currency: "USD",
  label: "$",
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCY_SWITCH:
      return {
        ...state,
        currency: action.currency,
        label: action.label,
      };

    default:
      return state;
  }
};

export default currencyReducer;
