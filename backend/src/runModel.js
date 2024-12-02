import { spawn } from "child_process";

const pythonProcess = spawn("python3", ["model/main.py", "--test"]);

let output = "";
const waitForConnectionSuccess = (data) => {
  const message = data.toString();
  console.log(message);
  output += message;
  if (output.includes("[Connection Succeeded]")) {
    pythonProcess.stdout.off("data", waitForConnectionSuccess);
  }
};

pythonProcess.stdout.on("data", waitForConnectionSuccess);

pythonProcess.stderr.on("data", (data) => {
  console.error(`Error: ${data.toString()}`);
});

pythonProcess.on("close", (code) => {
  console.log(`Python process exited with code ${code}`);
});

export default pythonProcess;
