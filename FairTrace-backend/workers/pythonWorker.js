const { spawn } = require("child_process");

module.exports = (session) => {
  return new Promise((resolve, reject) => {

    const py = spawn("python3", [
      "python_engine/main.py",
      "--session_id", session.sessionId,
      "--dataset", session.inputs.datasetPath,
      "--model", session.inputs.modelPath,
      "--target", session.inputs.targetColumn,
      "--protected", session.inputs.protectedAttribute
    ]);

    let output = "";

    py.stdout.on("data", data => {
      output += data.toString();
    });

    py.on("close", code => {
      if (code === 0) {
        resolve(JSON.parse(output));
      } else {
        reject("Python Error");
      }
    });

  });
};