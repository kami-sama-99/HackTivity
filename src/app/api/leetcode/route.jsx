export async function POST(req) {
    try {
      const { username } = await req.json();
      if (!username) {
        return Response.json({ error: "Username is required" }, { status: 400 });
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
  
      const stats = {
        ranking: user.profile?.ranking || 0,
        contributionPoints: user.profile?.reputation || 0,
        easySolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "Easy")?.count || 0,
        mediumSolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "Medium")?.count || 0,
        hardSolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "Hard")?.count || 0,
        totalSolved: user.submitStats.acSubmissionNum.find(q => q.difficulty === "All")?.count || 0,
      };
  
      return Response.json(stats, { status: 200 });
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
  
  // CORS Preflight Support (Optional)
  export async function OPTIONS() {
    return Response.json({}, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
  