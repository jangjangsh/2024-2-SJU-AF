import { Router } from "express";

const chatRouter = (pythonProcess) => {
  const router = Router();

  router.post("/", (req, res) => {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    pythonProcess.stdin.write(`${question}\n`);

    let output = "";
    const handleData = (data) => {
      const message = data.toString();
      console.log(message);
      output += message;
      if (output.includes("ANSWER:")) {
        const splittedOutput = output.split(":");
        res.json({ answer: splittedOutput[splittedOutput.length - 1] });
        pythonProcess.stdout.off("data", handleData);
      }
    };

    pythonProcess.stdout.on("data", handleData);

    pythonProcess.stderr.on("data", (error) => {
      console.error(`Python stderr: ${error.toString()}`);
      res.status(500).json({ error: "Error processing the question" });
    });
  });

  return router;
};

export default chatRouter;
