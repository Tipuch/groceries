import { TestAction } from "../actions/testAction";

export const testReducer = (state = {}, action: TestAction) => {
    switch(action.type) {
        case "TEST_USER": {
            return {...state, user: action.payload};
        }
    }
};