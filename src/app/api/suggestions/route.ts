import { NextResponse } from "next/server";
import { getJson } from "serpapi";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q'); // Get the query parameter
  
    const response = await getJson({
      engine: "google_autocomplete",
      api_key: "6cb4251d8eee52a42ca1e7dbe1980397a7fad7d2cfbf8c4b1ef9800c0d4b2498", // Make sure to keep your API key secure
      q: query
    });
  
    return NextResponse.json(response["suggestions"]);
  }