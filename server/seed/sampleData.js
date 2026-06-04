import bcrypt from "bcryptjs";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

export const demoUsers = [
  {
    name: "Aarav Mehta",
    email: "aarav@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    bio: "Frontend developer writing about calm product design."
  },
  {
    name: "Diya Sharma",
    email: "diya@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
    bio: "Student, reader, and everyday blogger."
  },
  {
    name: "Kabir Patel",
    email: "kabir@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
    bio: "Backend learner sharing notes from projects."
  },
  {
    name: "Meera Iyer",
    email: "meera@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    bio: "Writes about habits, teams, and technology."
  },
  {
    name: "Roshni Raichandani",
    email: "roshni.demo@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
    bio: "MERN stack learner building practical apps."
  }
];

export const samplePosts = [
  ["Designing a calmer morning routine", "Small morning rituals can make the rest of the day feel less rushed and more intentional.", "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"],
  ["What I learned from writing daily", "A daily writing habit turns scattered thoughts into clearer ideas that are easier to share.", "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"],
  ["Simple ways to plan a project", "Breaking work into visible tasks helps teams notice blockers early and finish with less stress.", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"],
  ["Why clean UI states matter", "Empty, loading, success, and error states shape how trustworthy an application feels to users.", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"],
  ["A beginner guide to API thinking", "Good APIs are predictable, consistent, and easy to test from the first endpoint onward.", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"],
  ["Lessons from debugging late at night", "The fastest fix often starts with slowing down enough to reproduce the problem carefully.", "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"],
  ["Building better study habits", "Consistent review sessions and practical examples make difficult topics easier to remember.", "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"],
  ["How comments improve code", "Useful comments explain surprising decisions and leave obvious code free to speak for itself.", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"],
  ["Keeping frontend forms friendly", "Helpful validation messages can turn form mistakes into quick corrections instead of frustration.", "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80"],
  ["The value of small releases", "Shipping smaller updates reduces risk and gives users improvements while feedback is still fresh.", "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"],
  ["Choosing useful project names", "A clear project name makes repositories, dashboards, and conversations easier to navigate later.", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"],
  ["Making dashboards easier to scan", "Strong spacing, clear labels, and restrained color help people find important information quickly.", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"],
  ["Notes on learning MongoDB", "Documents, collections, indexes, and references become easier when modeled around real app workflows.", "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80"],
  ["How to write helpful README files", "A README should explain setup, environment variables, scripts, and the first successful run.", "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80"],
  ["Why authentication needs care", "Password hashing, token expiry, and protected routes are small details with large security impact.", "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80"],
  ["Turning feedback into features", "The best feature requests usually reveal a workflow problem before they describe a solution.", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"],
  ["Preparing for internship work", "Readable commits, focused questions, and steady progress make collaboration much easier.", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"],
  ["Creating a better blog feed", "A good feed balances fresh content, author context, interaction counts, and quick reading comfort.", "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80"],
  ["Organizing server folders", "Routes, controllers, services, models, and middleware each stay simpler when responsibilities are clear.", "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80"],
  ["Testing the happy path first", "Once the main user journey works, edge cases become easier to isolate and verify.", "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80"],
  ["Keeping deployments boring", "Reliable deployment depends on clear configuration, stable scripts, and secrets kept outside source code.", "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"],
  ["Learning through small projects", "Small complete projects build confidence because every layer becomes visible from idea to deployment.", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"]
];

export async function upsertDemoUsers() {
  const passwordHash = await bcrypt.hash("Password123", 10);

  return Promise.all(
    demoUsers.map((user) =>
      User.findOneAndUpdate(
        { email: user.email },
        { $set: { ...user, passwordHash } },
        { returnDocument: "after", upsert: true }
      )
    )
  );
}

export function buildPosts(users, existingCount, minimumPosts = 20) {
  const needed = Math.max(0, minimumPosts - existingCount);
  const now = Date.now();

  return samplePosts.slice(0, needed).map(([title, content, imageUrl], index) => {
    const author = users[index % users.length];
    const otherUsers = users.filter((user) => !user._id.equals(author._id));

    return {
      title,
      content,
      imageUrl,
      author: author._id,
      comments: [
        {
          text: "This was useful and easy to follow.",
          author: otherUsers[0]._id,
          authorName: otherUsers[0].name,
          authorAvatarUrl: otherUsers[0].avatarUrl
        },
        {
          text: "I would like to read more on this topic.",
          author: otherUsers[1]._id,
          authorName: otherUsers[1].name,
          authorAvatarUrl: otherUsers[1].avatarUrl
        }
      ],
      likedBy: otherUsers.slice(0, (index % 3) + 1).map((user) => user._id),
      createdAt: new Date(now - index * 60 * 60 * 1000),
      updatedAt: new Date(now - index * 60 * 60 * 1000)
    };
  });
}

export async function ensureSampleData(minimumPosts = 20) {
  const users = await upsertDemoUsers();
  const existingCount = await Post.countDocuments();
  const posts = buildPosts(users, existingCount, minimumPosts);

  if (posts.length > 0) {
    await Post.insertMany(posts);
  }

  const existingPostsWithoutImages = await Post.find({
    $or: [{ imageUrl: { $exists: false } }, { imageUrl: "" }]
  }).sort({ createdAt: -1 });

  await Promise.all(
    existingPostsWithoutImages.map((post, index) => {
      post.imageUrl = samplePosts[index % samplePosts.length][2];
      return post.save();
    })
  );

  return { addedPosts: posts.length, totalPosts: await Post.countDocuments() };
}
