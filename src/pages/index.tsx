import Highlight from "react-highlight";
import * as React from "react";
import Head from "next/head";

const codeContend = `
  import {Merlin} from "https://proxy.mod.land/crewdevio/merlin/mod.ts";

  const test = new Merlin();

  test.assertEqual("two plus two is four", {
    expect() {
      return 2 + 2;
    },
    toBe() {
      return 4;
    },
  });
       `;

const Code = ({ value }: { value: string }) => {
  return (
    <pre>
      <code>
        <Highlight className="rounded-lg overflow-auto">{value}</Highlight>
      </code>
      <br />
    </pre>
  );
};

const Span: React.FC<{ bg: string; leading?: boolean }> = ({
  children,
  bg,
  leading,
}) => {
  return (
    <span
      className={
        `rounded px-2 h-6 inline-flex items-center text-white text-sm` +
        (bg ? ` ${bg}` : "") +
        (leading ? ` mr-2` : ` mx-2`)
      }
    >
      {children}
    </span>
  );
};

export default () => {
  return (
    <div>
      <Head>
        <title>Proxy GitRaw</title>
      </Head>
      <div className="container px-2 max-w-2xl mx-auto">
        <div className="my-5 text-xl">
          To use GitHub as a package registry for Deno, you only need to replace{" "}
          <code className="text-sm bg-gray-200 rounded p-1">github.com</code>{" "}
          with{" "}
          <code className="text-sm bg-gray-200 rounded p-1">proxy.mod.land</code>{" "}
          like this:
        </div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://proxy.mod.land
          </Span>
          /<Span bg="bg-black">user</Span>/
          <Span bg="bg-black">repo or repo@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div className="my-5 text-xl">Example:</div>
        <div className="my-5">
          <Code value={codeContend} />
        </div>

        <span className="my-5 text-xl">
          Proxy GitRaw is a fork from{" "}
          <a className="text-blue" href="https://denopkg.com">
            denopkg.com
          </a>{" "}
          for use as a proxy for
          <a className="text-blue" href="https://github.com/crewdevio/trex">
            Trex package manager
          </a>
        </span>
      </div>
    </div>
  );
};
