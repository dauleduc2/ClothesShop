import connection from "./common/connection";

beforeAll(async () => {
    await connection.create();
});

afterAll(async () => {
    await connection.close();
});

beforeEach(async () => {
    await connection.clear();
});

describe("login route", () => {
    it("login as user", () => {
        // TODO
    });
});
