# Twitter favorites per minute

This is a quick and dirty script to poll the twitter API once a minute and persist the data into a mysql docker container. Run the below query to chuck out results.

## Todo

Not idempotent
No tests or validation
Lint & Prettier

## Setup

Requirements:
docker
nodejs
twitter api keys

Use .env.example to create your own .env

```bash
docker-compose up
npx ts-node pollStats.ts [TweetID]
```

Run the SQL below to get likes

```sql
SELECT
	JSON_EXTRACT(data, '$.favorite_count') as favoriteCount,
    LAG(JSON_EXTRACT(data, '$.favorite_count'),1,0) OVER (
        ORDER BY createdAt
    ) previousFavorite,
    JSON_EXTRACT(data, '$.favorite_count') - LAG(JSON_EXTRACT(data, '$.favorite_count'),1,0) OVER (
        ORDER BY createdAt
    ) as difference,
    createdAt
FROM
	twitter.tweet_status where tweetId = ?
```
