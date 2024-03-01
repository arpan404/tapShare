import { promisify } from "util";
import { exec as execCallback } from "child_process";
import fs from "fs";
import path from "path";
import fsExtra from "fs-extra";

const exec = promisify(execCallback);

const compileTSfiles = async () => {
  try {
    const compiledPath = path.join(__dirname, "build");
    if (fs.existsSync(compiledPath)) {
      console.log("\n\nBuild folder exists\nDeleting build folder...");
      await fs.promises
        .rm(compiledPath, { recursive: true })
        .catch((error) => {
          console.log(
            "Error deleting folder. Try deleting the existing 'build' folder to continue building the project.",
          );
          throw error;
        })
        .then(() => console.log("Deleted 'build' folder\n"));
    } else {
      console.log("No existing 'build' folder.\n");
    }
    console.log("Started compiling the project\n");
    const buildResult = await exec("tsc");
    if (buildResult.stderr) {
      console.log(
        "Something went wrong while building the project\nError: ",
        buildResult.stderr,
        "\n",
      );
    } else {
      console.log("TS code has been compiled successfully.\n");
    }
  } catch (error) {
    console.error("Error building project.\n");
    throw error;
  }
};

const buildProject = async () => {
  try {
    await compileTSfiles();
    const compiledDirName = "compiledTemp";
    if (fs.existsSync(path.join(__dirname, compiledDirName))) {
      console.log("Deleting 'compiled-temp'...");
      await fs.promises
        .rm(compiledDirName, { recursive: true })
        .catch((error) => {
          console.log(
            "Error deleting folder. Try deleting the existing 'compiled-temp' folder to continue building the project.",
          );
          throw error;
        })
        .then(() => console.log("Deleted 'compiled-temp' folder\n"));
    }
    await fs.promises.rename("build", compiledDirName);
    await fs.promises.mkdir("build");
    console.log("Copying files from 'compiled-temp' to 'build'");
    await fsExtra
      .copy(
        path.join(__dirname, compiledDirName),
        path.join(__dirname, "build"),
        { overwrite: true },
      )
      .then(async () => {
        await fs.promises
          .rm(compiledDirName, { recursive: true })
          .catch(() => {
            console.log(
              "Error deleting folder. Try deleting the existing 'compiled-temp' manually.",
            );
          })
          .then(() => console.log("Deleted 'compiled-temp' folder\n"));
      })
      .catch((error) => {
        throw error;
      });

    await fs.promises.copyFile(
      path.join(__dirname, "package.json"),
      path.join(__dirname, "build", "package.json"),
    );
    await fs.promises.copyFile(
      path.join(__dirname, ".env"),
      path.join(__dirname, "build", ".env"),
    );
    console.log(
      "\n\nProject is build.\nUse ' cd build && npm i && npm run start ' to use the build project",
    );
  } catch (error) {
    console.error(error);
  }
};

buildProject();
