// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
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
  res.statusCode = 200;
  res.send("Success");
};
