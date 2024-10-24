const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog1.txt", {
  encoding: "utf-8",
});
// readStream.on("data", (chunk) => {
//   console.log(chunk.toString());
//   console.log("new chunk");
//   writeStream.write('new chunkiiii')
//   writeStream.write(chunk)
// });

const writeStream = fs.createWriteStream('./docs/blog2.txt')


//piping
readStream.pipe(writeStream)