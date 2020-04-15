import { config } from "dotenv";
import { Sequelize, Model, DataTypes } from "sequelize";
import Twitter from "twitter";
config();

const sequelize = new Sequelize(
  process.env["MYSQL_DATABASE"],
  process.env["MYSQL_USERNAME"],
  process.env["MYSQL_ROOT_PASSWORD"],
  {
    dialect: "mysql",
  }
);

const twitter = new Twitter({
  consumer_key: process.env["TWITTER_CONSUMER_KEY"],
  consumer_secret: process.env["TWITTER_CONSUMER_SECRET"],
  access_token_key: process.env["TWITTER_ACCESS_TOKEN_KEY"],
  access_token_secret: process.env["TWITTER_ACCESS_TOKEN_SECRET"],
});

class TweetStatusData extends Model {
  public id!: number;
  public tweetId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly data!: JSON;
}
TweetStatusData.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
      autoIncrement: true,
      primaryKey: true,
    },
    tweetId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tweet_status",
  }
);

async function main() {
  await TweetStatusData.sync();
  const data = await twitter.get(`statuses/show/${process.argv[2]}`, {});
  TweetStatusData.create({
    tweetId: parseInt(process.argv[2]),
    data,
  });
}
main().catch((e: Error) => console.error(e));
setInterval(() => main().catch((e: Error) => console.error(e)), 60 * 1000); // Todo: Figure out rate limit
