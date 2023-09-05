import { config } from "dotenv";
process.env.TZ = "Asia/Jakarta";
config();
import app from "./app";

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "Development";

app.listen(PORT, () => {
  console.log(`Express ${ENV} server listening on port ${PORT}`);
});

export default app;
