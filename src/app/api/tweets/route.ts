import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { unstable_cache } from "next/cache";

// Load environment variables
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

if (!BEARER_TOKEN) {
  throw new Error("Missing Twitter Bearer Token in environment variables");
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Define the type for the tweet response
interface TweetResponse {
  data: any; // You can refine this type based on Twitter API v2 response
  includes?: {
    users?: any[];
    media?: any[];
  };
  meta?: any;
}

// Create a function to generate a cached tweet fetcher with dynamic keys
const getCachedTweet = (tweetId: string) => {
  return unstable_cache(
    async () => {
      const client = new TwitterApi(BEARER_TOKEN);

      const fetchTweetWithRetry = async (
        maxRetries: number = 3
      ): Promise<TweetResponse> => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            const tweet = await client.v2.singleTweet(tweetId, {
              "tweet.fields": ["created_at", "text", "author_id", "entities"],
              "user.fields": ["username", "name", "profile_image_url"],
              "media.fields": ["media_key", "type", "url"],
              expansions: ["author_id", "attachments.media_keys"],
            });

            console.log(
              "Full Twitter API Response for Tweet:",
              JSON.stringify(tweet, null, 2)
            );
            return tweet;
          } catch (err: any) {
            if (err.status === 429) {
              console.warn(
                `Rate limit exceeded (Attempt ${attempt}/${maxRetries}). Waiting before retry...`
              );
              const retryAfter =
                err.response?.headers?.get("retry-after") || 900; // Default to 15 minutes (900 seconds)
              await delay(retryAfter * 1000); // Wait for the specified time
              continue; // Retry the request
            }
            throw err; // Re-throw other errors
          }
        }
        throw new Error("Max retries reached for rate limit handling");
      };

      return await fetchTweetWithRetry();
    },
    [`tweet-${tweetId}`], // Dynamic cache key based on tweetId
    {
      tags: ["tweet"], // Optional: tags for cache invalidation
      revalidate: 900, // Cache for 15 minutes (900 seconds)
    }
  );
};

export async function GET(req: Request) {
  // Parse the tweet ID from the query parameter
  const url = new URL(
    req.url,
    `http://${req.headers.get("host") || "localhost:3000"}`
  );
  const tweetId = url.searchParams.get("id");

  if (!tweetId) {
    return NextResponse.json(
      { message: "Tweet ID is required" },
      { status: 400 }
    );
  }

  // Validate tweet ID format (optional, but recommended for security)
  if (!/^\d+$/.test(tweetId)) {
    return NextResponse.json(
      { message: "Invalid tweet ID format" },
      { status: 400 }
    );
  }

  try {
    // Throttle requests (e.g., delay 1 second between requests to avoid rapid-fire calls)
    await delay(1000); // Optional: Add a small delay to prevent overwhelming the API

    // Fetch or retrieve cached tweet using the dynamically generated function
    const cachedFetcher = getCachedTweet(tweetId);
    const tweet = await cachedFetcher();

    return NextResponse.json({
      tweet: tweet.data,
      includes: tweet.includes || {}, // Include media/users in response
    });
  } catch (err: any) {
    console.error("Error fetching tweet:", {
      error: err.message,
      status: err.status || (err.response && err.response.status),
      data: err.data || (err.response && err.response.data),
      headers: err.response?.headers, // Log rate limit headers for debugging
    });

    if (err.status === 429) {
      return NextResponse.json(
        {
          message: "Rate limit exceeded. Please try again later.",
          error: err.message,
          retryAfter: err.response?.headers?.get("retry-after") || 900, // Suggest wait time in seconds
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to fetch tweet",
        error: err.message || "Unknown error",
        status: err.status || (err.response && err.response.status) || 500,
      },
      { status: err.status || (err.response && err.response.status) || 500 }
    );
  }
}
