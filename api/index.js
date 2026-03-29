export default async function handler(req, res) {
  const feedUrl = "https://jordansadie.substack.com/feed";

  const response = await fetch(feedUrl);
  const text = await response.text();

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    source: "Substack",
    feed: feedUrl,
    content: text
  });
}

