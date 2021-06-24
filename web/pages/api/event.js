// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const LRU = require("lru-cache");

const rateLimit = (options) => {
  const tokenCache = new LRU({
    max: parseInt(options.uniqueTokenPerInterval || 500, 10),
    maxAge: parseInt(options.interval || 60000, 10),
  });

  return {
    check: (res, limit, token) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= parseInt(limit, 10);
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
          "X-RateLimit-Remaining",
          isRateLimited ? 0 : limit - currentUsage
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
};

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(req, res) {
  try {
    await limiter.check(res, 4, "CACHE_TOKEN"); // 10 requests per minute
    const Pusher = require("pusher");

    const pusher = new Pusher({
      appId: "1155455",
      key: process.env.KEY,
      secret: process.env.SECRET,
      cluster: "us2",
      useTLS: true,
    });

    await pusher.trigger("sound-festival", "incoming", {
      sfx: req.query.sfx,
      beat: req.query.beat,
    });
    console.log('triggered!')
    res.statusCode = 200;
    res.status(200).json({"Success": true});
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
