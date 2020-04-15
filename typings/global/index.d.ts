declare namespace NodeJS {
  export interface ProcessEnv {
    TWITTER_CONSUMER_KEY: string;
    TWITTER_CONSUMER_SECRET: string;
    TWITTER_ACCESS_TOKEN_KEY: string;
    TWITTER_ACCESS_TOKEN_SECRET: string;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_PORT: string;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
  }
}
