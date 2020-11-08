import { NextApiHandler, NextApiResponse } from "next";

const MATCHER = /^([^\/]+)\/([^\/@]+)(@)?(.*)/;

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
  const [, owner, repo, versionSpecified, rest] = m;
  if (!owner || !repo) {
    return invalidURL(res);
  }

  const version = `${versionSpecified ? "" : "master"}`;
  const resEnd = `${rest || "/mod.ts"}`;

  res.status(301);
  res.setHeader(
    "Location",
    `https://gitlab.com/${owner}/${repo}/-/raw/${version}${resEnd}`
  );
  res.end();
};

export default handler;
