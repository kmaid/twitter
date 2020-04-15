Test

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
