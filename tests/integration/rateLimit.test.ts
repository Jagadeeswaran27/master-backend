import request from "supertest";

import app from "../../src/app.js";

describe("Rate Limiting", () => {
  it("should block requests after exceeding auth rate limit", async () => {
    const requests = [];

    for (let i = 0; i < 6; i++) {
      requests.push(
        request(app).post("/api/v1/auth/login").send({
          email: "test@example.com",
          password: "wrongpassword",
        })
      );
    }

    const responses = await Promise.all(requests);
    const lastResponse = responses[responses.length - 1];

    expect(lastResponse?.status).toBe(429);
  }, 30000);
});
