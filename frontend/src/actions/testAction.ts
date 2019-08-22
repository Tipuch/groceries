interface TestUserAction {
    type: "TEST_USER";
    payload: {
      user: string;
    };
}

type TestAction = TestUserAction