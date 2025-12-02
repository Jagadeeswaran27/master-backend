import "dotenv/config";
import "@jest/globals";
import prisma from "../src/utils/prisma.js";
beforeEach(async () => {
    await prisma.user.deleteMany();
});
afterAll(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=setup.js.map