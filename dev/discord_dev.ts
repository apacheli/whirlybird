async function* readDir(dir: string): AsyncGenerator<string> {
  for await (const dirEntry of Deno.readDir(dir)) {
    const path = `${dir}/${dirEntry.name}`;
    if (dirEntry.isDirectory) {
      yield* readDir(path);
    } else if (path.substring(path.length - 3) === ".ts") {
      yield path;
    }
  }
}

const fixFile = async (path: string) => {
  const data = await Deno.readTextFile(path);
  const newData = data.replace(/com\/developers\/docs/g, "dev");

  if (data !== newData) {
    await Deno.writeTextFile(path, newData);
    console.log(`Fixed ${path}`);
  }
};

for await (const path of readDir("core/types")) {
  fixFile(path);
}
