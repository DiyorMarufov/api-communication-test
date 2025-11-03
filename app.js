import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

let part2 = "";

app.post("/", (req, res) => {
  part2 = req.body.part2;
  console.log("Part2 olindi: ", part2);
  res.sendStatus(200);
});

app.listen(4000, async () => {
  console.log(`Server is running on port`, 4000);

  // Shu yerga copy qilingan localtunneldagi url qoyiladi...
  const webhook_url = "https://olive-files-cough.loca.lt";

  const payload = {
    msg: "Hello",
    url: webhook_url,
  };

  const post = await axios.post("https://test.icorp.uz/interview.php", payload);

  const part1 = post.data?.part1;
  console.log("Part1 olindi: ", part1);

  setTimeout(async () => {
    const code = part1 + part2;

    const get = await axios.get(
      `https://test.icorp.uz/interview.php?code=${code}`
    );

    console.log("Yakuniy code: ", code);
    console.log("Yuborilgan xabar: ", get.data?.msg);
  });
});
