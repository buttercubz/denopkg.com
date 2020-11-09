export const modules = [
  "_util",
  "archive",
  "encoding",
  "fmt",
  "node",
  "testing",
  "wasi",
];

export function ResponseProxy(module: string, version: string): string {
  const needs: { [index: string]: string } = {
    _util: `
    /**
    * Copyright (c) Crew Dev.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    */

   import * as property from "https://deno.land/std${version}/_util/has_own_property.ts";
   import * as deep_assign from "https://deno.land${version}/std/_util/deep_assign.ts";
   import * as assert from "https://deno.land/std${version}/_util/assert.ts";

   export { assert, deep_assign, property };
   `,
    archive: `
    /**
    * Copyright (c) Crew Dev.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    */

   import * as archive from "https://deno.land/std${version}/archive/tar.ts";

   export { archive };
   `,

    encoding: `
      /**
      * Copyright (c) Crew Dev.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE file in the root directory of this source tree.
      *
      */

     import * as base64url from "https://deno.land/std${version}/encoding/base64url.ts";
     import * as ascii86 from "https://deno.land/std${version}/encoding/ascii85.ts";
     import * as base32 from "https://deno.land/std${version}/encoding/base32.ts";
     import * as base64 from "https://deno.land/std${version}/encoding/base64.ts";
     import * as binary from "https://deno.land/std${version}/encoding/binary.ts";
     import * as toml from "https://deno.land/std${version}/encoding/toml.ts";
     import * as utf8 from "https://deno.land/std${version}/encoding/utf8.ts";
     import * as yalm from "https://deno.land/std${version}/encoding/yalm.ts";
     import * as csv from "https://deno.land/std${version}/encoding/csv.ts";
     import * as hex from "https://deno.land/std${version}/encoding/hex.ts";

     export { base32, base64, base64url, binary, csv, hex, toml, yalm, utf8, ascii86 };`,

    fmt: `
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
     `,
    node: `
    /**
    * Copyright (c) Crew Dev.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    */

   import * as querystring from "https://deno.land/std${version}/node/querystring.ts";
   import * as process from "https://deno.land/std${version}/node/process.ts";
   import * as module from "https://deno.land/std${version}/node/module.ts";
   import * as buffer from "https://deno.land/std${version}/node/buffer.ts";
   import * as events from "https://deno.land/std${version}/node/events.ts";
   import * as timers from "https://deno.land/std${version}/node/timers.ts";
   import * as _util from "https://deno.land/std${version}/node/_utils.ts";
   import * as util from "https://deno.land/std${version}/node/util.ts";
   import * as path from "https://deno.land/std${version}/node/path.ts";
   import * as url from "https://deno.land/std${version}/node/url.ts";
   import * as os from "https://deno.land/std${version}/node/os.ts";
   import * as fs from "https://deno.land/std${version}/node/fs.ts";

   export {
     querystring,
     process,
     module,
     buffer,
     events,
     timers,
     util,
     path,
     url,
     os,
     fs,
   };
   `,

    testing: `
    /**
    * Copyright (c) Crew Dev.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    */

   import * as asserts from "https://deno.land/std${version}/testing/asserts.ts";
   import * as bench from "https://deno.land/std${version}/testing/bench.ts";
   import * as diff from "https://deno.land/std${version}/testing/_diff.ts";

   export { asserts, bench, diff };
   `,

    wasi: `
    /**
    * Copyright (c) Crew Dev.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    */

   import * as wasi from "https://deno.land/std${version}/wasi/snapshot_preview1.ts"

   export { wasi };`,
  };

  return needs[module];
}
