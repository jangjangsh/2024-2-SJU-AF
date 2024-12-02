import "dotenv/config"; // 환경 변수(예민한 정보임)
import app from "./app";
import "./db";

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버가 실행 중...`);
});
