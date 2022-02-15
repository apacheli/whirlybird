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

const fixUrl = (url: string) =>
  url
    .substring(4)
    .replace(/GAME_SDK/g, "game-sdk")
    .replace(/SDK_STARTER_GUIDE/g, "sdk-starter-guide")
    .replace(/APPLICATION_COMMANDS/g, "application-commands")
    .replace(/RESPONDING_AND_RECEIVING/g, "responding-and-receiving")
    .replace(/GUILD_SCHEDULED_EVENT/g, "guild-scheduled-event")
    .replace(/GUILD_TEMPLATE/g, "guild-template")
    .replace("/", "#")
    .replace(/_/g, "/")
    .toLowerCase();

const fixFile = async (path: string) => {
  const data = await Deno.readTextFile(path);
  const newData = data
    .replace(/\(#(.+?)\)/g, (_, x) => `(https://discord.dev${fixUrl(x)})`)
    .replace(/com\/developers\/docs/g, "dev");

  if (data !== newData) {
    await Deno.writeTextFile(path, newData);
    console.log(`Patched ${path}`);
  }
};

for await (const path of readDir("core/types")) {
  fixFile(path);
}
