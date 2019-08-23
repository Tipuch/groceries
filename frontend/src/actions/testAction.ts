interface TestUserAction {
    type: "TEST_USER";
    payload: {
      user: string;
    };
}

export type TestAction = TestUserAction

export function changeUser(user: string) {
    return {
        type: "TEST_USER",
        payload: {
            user: user
        }
    }
}