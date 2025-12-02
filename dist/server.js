import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import logger from "./utils/logger.js";
const PORT = process.env.PORT || "8081";
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map