import { NextApiHandler, NextApiResponse } from "next";
import { ResponseProxy, modules } from "./stdHandler";

const MATCHER = /^([^\/@]+)(@[^\/]+)?(.*)/;

const invalidURL = (res: NextApiResponse) => {
  res.status(500);
  res.end(`Invalid URL, must be end with /mod.ts`);
};

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string;

  const m = MATCHER.exec(slug);

  if (!m) {
    return invalidURL(res);
  }
  const [, moduleName, specifiedVersion, filepath] = m;

  // if no pass mod.ts or module name
  if (!moduleName || filepath !== "/mod.ts" || !moduleName) {
    return invalidURL(res);
  }

  console.log({ moduleName, specifiedVersion, filepath });

  const versionModule: string = specifiedVersion ? specifiedVersion : "";

  if (!specifiedVersion) {
    res.status(301);
    res.setHeader(
      "x-deno-warning",
      `Using implicit latest version of ${moduleName}${versionModule} module`
    );
    res.setHeader("Location", `fmt${versionModule}/mod.ts`);
    res.end();
  }

  if (!modules.includes(moduleName)) {
    res.status(404);
    res.end(`${moduleName}${versionModule} not exists`);
  }

  res.setHeader("Cache-Control", [
    "s-maxage=86400",
    "stale-if-error=1",
    "immutable",
  ]);

  const version = versionModule === "" ? "" : versionModule;

  res.status(200);
  res.end(ResponseProxy(moduleName, version));
};

export default handler;
