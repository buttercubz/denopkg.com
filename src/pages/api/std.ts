import { NextApiHandler, NextApiResponse } from "next";

const MATCHER = /^([^\/@]+)(@[^\/]+)?(.*)/;

const invalidURL = (res: NextApiResponse) => {
  res.status(500);
  res.end(`Invalid URL`);
};

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string;

  const m = MATCHER.exec(slug);

  if (!m) {
    return invalidURL(res);
  }
  const [, moduleName, specifiedVersion, filepath] = m;
  if (!moduleName) {
    return invalidURL(res);
  }

  console.log({ moduleName, specifiedVersion, filepath });

  const versionModule: string = specifiedVersion ? specifiedVersion : "";

  if (!filepath) {
    res.status(301);
    res.setHeader(
      "x-deno-warning",
      `using trex proxy to download this package fmt${versionModule}`
    );
    res.setHeader("Location", `fmt${versionModule}/mod.ts`);
    res.end();
  }

  res.setHeader("Cache-Control", [
    "s-maxage=86400",
    "stale-if-error=1",
    "immutable",
  ]);

  const version = versionModule === "" ? "" : `@${versionModule}`;

  res.status(200);
  res.end(`
/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as colors from "https://deno.land/std${version}/fmt/colors.ts";
import * as printf from "https://deno.land/std${version}/fmt/printf.ts";

export { colors, printf };
`);
};

export default handler;
