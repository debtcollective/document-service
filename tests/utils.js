import fs from "fs";
import path from "path";
import tmp from "tmp";

/**
 * Persist files and returns paths
 * @param {Array<Buffer, string>} files
 */
export const persistFiles = files => {
  const tmpDir = tmp.dirSync();
  const pathToPDFfolder = tmpDir.name;

  return Promise.all(
    files.map(async ([file, filename]) => {
      return new Promise((resolve, reject) => {
        const pathToFile = path.join(pathToPDFfolder, filename);

        return fs.writeFile(pathToFile, file, err => {
          if (err) {
            reject(err);
          } else {
            resolve(pathToFile);
          }
        });
      });
    })
  );
};
