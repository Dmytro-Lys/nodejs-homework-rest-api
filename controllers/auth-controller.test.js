import 'dotenv/config'
import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";

const { TEST_DB_CONNECT, PORT = 3000 } = process.env;

describe("test signin controller", () => {
    let server = null;
    beforeAll(async () => {
        await mongoose.connect(TEST_DB_CONNECT);
        server = app.listen(PORT);
    })

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    })

    test("test signin with correct data", async () => {
        const signinData = {
            email: "test2@gmail.com",
            password: "12345aA-"
        }
        const { statusCode, body } = await request(app).post("/api/users/login").send(signinData);
        console.log("the response must have a status code of 200")
        expect(statusCode).toBe(200);
        console.log("the response must return a token")
        expect(body.token).toBeTruthy();
        const userKeys = Object.keys(body.user)
        console.log("the user object with 2 fields email and subscription with the String data type should be returned in the response")
        expect(userKeys.length).toBe(2);
        expect(userKeys.includes("email")).toBeTruthy()
        expect(userKeys.includes("subscription")).toBeTruthy()
        expect(typeof body.user.email).toBe("string");
        expect(typeof body.user.subscription).toBe("string");
    })
})