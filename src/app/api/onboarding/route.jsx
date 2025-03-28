import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const extractUsername = (url, platform) => {
  try {
    const regex = {
      github: /github\.com\/([^/?]+)/,
      leetcode: /leetcode\.com\/u\/([^/?]+)/,
    };
    const match = url.match(regex[platform]);
    return match ? match[1] : null;
  } catch (error) {
    console.error(`Error extracting ${platform} username:`, error);
    return null;
  }
};

const fetchGitHubData = async (username) => {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);

    if (!userRes.ok || !reposRes.ok) throw new Error("Failed to fetch GitHub data");

    const userData = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalRepos = userData.public_repos;

    return {
      followers: userData.followers,
      starsReceived: totalStars,
      totalRepos,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
};  

const fetchLeetCodeData = async (username) => {
  console.log(username);
  try {
    if (!username) {
      return { error: "Username is required" };
    }

    const query = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            profile {
              ranking
              reputation
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    if (!response.ok) throw new Error("Failed to fetch LeetCode data");

    const data = await response.json();
    const user = data.data.matchedUser;

    if (!user) throw new Error("User not found");

    return {
      ranking: user.profile?.ranking || 0,
      contributionPoints: user.profile?.reputation || 0,
      easySolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "Easy")?.count || 0,
      mediumSolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "Medium")?.count || 0,
      hardSolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "Hard")?.count || 0,
      totalSolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "All")?.count || 0,
    };
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return null;
  }
};


const calculateScore = (githubData, leetcodeData) => {
    // Normalize ranking: Scale ranking between 0 and 100
    const maxRanking = 2000000; // Assume worst rank ~2M
    const rankingFactor = 100 - (leetcodeData.ranking / maxRanking) * 100;
  
    return (
      githubData.followers * 3 +   // Increased weight for followers
      githubData.starsReceived * 2 + 
      githubData.totalRepos * 2 +
      leetcodeData.totalSolved * 4 + // Higher weight for totalSolved
      rankingFactor // Adds a small boost for better rankings
    );
  };
  

export async function POST(req) {
  try {
    const { userId, formData } = await req.json();

    const githubUsername = extractUsername(formData.github, "github");
    const leetcodeUsername = extractUsername(formData.leetcode, "leetcode");

    const [githubData, leetcodeData] = await Promise.all([
      githubUsername ? fetchGitHubData(githubUsername) : null,
      leetcodeUsername ? fetchLeetCodeData(leetcodeUsername) : null
    ]);

    if (!githubData || !leetcodeData) {
      return NextResponse.json({ error: "Failed to fetch GitHub or LeetCode data" }, { status: 500 });
    }

    const score = calculateScore(githubData, leetcodeData);

    const formattedDOB = formData.dob ? Timestamp.fromDate(new Date(formData.dob)) : null;

    const userData = { ...formData, dob: formattedDOB, uid: userId };

    await setDoc(doc(db, "User Data", userId), userData, { merge: true });
    await setDoc(doc(db, "Onboarding Status", userId), { status: true }, { merge: true });

    await setDoc(
      doc(db, "Coding Stats", userId),
      { githubData, leetcodeData, score, lastUpdated: Timestamp.now() },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
