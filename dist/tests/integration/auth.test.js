import request from "supertest";
import app from "../../src/app.js";
describe("Auth API", () => {
    describe("POST /api/v1/auth/signup", () => {
        it("should create a new user with valid data", async () => {
            const response = await request(app).post("/api/v1/auth/signup").send({
                name: "Test User",
                email: "test@example.com",
                password: "password123",
            });
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty("id");
            expect(response.body.data.email).toBe("test@example.com");
            expect(response.body.data).not.toHaveProperty("password");
        });
        it("should fail with invalid email", async () => {
            const response = await request(app).post("/api/v1/auth/signup").send({
                name: "Test User",
                email: "invalid-email",
                password: "password123",
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Validation error");
        });
        it("should fail with short password", async () => {
            const response = await request(app).post("/api/v1/auth/signup").send({
                name: "Test User",
                email: "test@example.com",
                password: "short",
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Password must be at least 8 characters");
        });
        it("should fail with missing fields", async () => {
            const response = await request(app).post("/api/v1/auth/signup").send({
                email: "test@example.com",
            });
            expect(response.status).toBe(400);
        });
    });
    describe("POST /api/v1/auth/login", () => {
        beforeEach(async () => {
            // Create a test user before login tests
            await request(app).post("/api/v1/auth/signup").send({
                name: "Test User",
                email: "test@example.com",
                password: "password123",
            });
        });
        it("should login with valid credentials", async () => {
            const response = await request(app).post("/api/v1/auth/login").send({
                email: "test@example.com",
                password: "password123",
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.user.email).toBe("test@example.com");
            expect(response.body.data.token).toBeDefined();
        });
        it("should fail with wrong password", async () => {
            const response = await request(app).post("/api/v1/auth/login").send({
                email: "test@example.com",
                password: "wrongpassword",
            });
            expect(response.status).toBe(401);
        });
        it("should fail with non-existent user", async () => {
            const response = await request(app).post("/api/v1/auth/login").send({
                email: "nonexistent@example.com",
                password: "password123",
            });
            expect(response.status).toBe(404);
        });
    });
});
//# sourceMappingURL=auth.test.js.map