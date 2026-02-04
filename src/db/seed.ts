import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as dotenv from "dotenv";
import {
  blogContents,
  blogPosts,
  courseModules,
  courses,
  libraryItems,
  quizAttempts,
  quizQuestions,
  quizTopics,
  quizzes,
  topicCourses,
  topicQuizzes,
  topicSeries,
  topics,
  videoEpisodes,
  videoSeries,
} from "./schema";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is missing from environment variables!");
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

async function seed() {
  console.log("🌱 Seeding learning platform data...");

  await db.delete(topicSeries);
  await db.delete(topicCourses);
  await db.delete(topicQuizzes);
  await db.delete(topics);
  await db.delete(videoEpisodes);
  await db.delete(videoSeries);
  await db.delete(courseModules);
  await db.delete(courses);
  await db.delete(quizQuestions);
  await db.delete(quizAttempts);
  await db.delete(quizTopics);
  await db.delete(quizzes);
  await db.delete(blogContents);
  await db.delete(blogPosts);
  await db.delete(libraryItems);

  const [reactFoundations, tsTeams, designSystems, apiEssentials] = await db
    .insert(courses)
    .values([
      {
        slug: "react-foundations",
        title: "React Foundations",
        description: "Build UI with components, hooks, and patterns.",
        lessons: 24,
        duration: "4h 20m",
        level: "Beginner",
        progress: 62,
        quizSlug: "react-basics",
      },
      {
        slug: "typescript-for-teams",
        title: "TypeScript for Teams",
        description: "Type-safe APIs, generics, and architecture.",
        lessons: 18,
        duration: "3h 05m",
        level: "Intermediate",
        progress: 41,
        quizSlug: "typescript-deep-dive",
      },
      {
        slug: "design-systems",
        title: "Design Systems",
        description: "Tokens, theming, and reusable UI standards.",
        lessons: 16,
        duration: "2h 45m",
        level: "Advanced",
        progress: 78,
        quizSlug: "ui-architecture",
      },
      {
        slug: "api-essentials",
        title: "API Essentials",
        description: "REST, GraphQL, and authentication basics.",
        lessons: 20,
        duration: "3h 40m",
        level: "Beginner",
        progress: 12,
        quizSlug: "api-essentials",
      },
    ])
    .returning();

  await db.insert(courseModules).values([
    { courseId: reactFoundations.id, title: "Components & JSX", sortOrder: 1 },
    { courseId: reactFoundations.id, title: "Props and State", sortOrder: 2 },
    { courseId: reactFoundations.id, title: "Hooks & Effects", sortOrder: 3 },
    { courseId: reactFoundations.id, title: "Routing & Data Fetching", sortOrder: 4 },
    { courseId: tsTeams.id, title: "Types & Interfaces", sortOrder: 1 },
    { courseId: tsTeams.id, title: "Narrowing", sortOrder: 2 },
    { courseId: tsTeams.id, title: "Generics", sortOrder: 3 },
    { courseId: tsTeams.id, title: "API Contracts", sortOrder: 4 },
    { courseId: designSystems.id, title: "Design Tokens", sortOrder: 1 },
    { courseId: designSystems.id, title: "Components", sortOrder: 2 },
    { courseId: designSystems.id, title: "Theming", sortOrder: 3 },
    { courseId: designSystems.id, title: "Documentation", sortOrder: 4 },
    { courseId: apiEssentials.id, title: "REST Fundamentals", sortOrder: 1 },
    { courseId: apiEssentials.id, title: "Auth & Security", sortOrder: 2 },
    { courseId: apiEssentials.id, title: "GraphQL Basics", sortOrder: 3 },
    { courseId: apiEssentials.id, title: "Testing APIs", sortOrder: 4 },
  ]);

  const [reactSeries, tsSeries, productSeries, qaSeries] = await db
    .insert(videoSeries)
    .values([
      {
        slug: "react-fundamentals",
        title: "React Fundamentals",
        level: "Beginner",
        duration: "2h 15m",
        progress: 54,
      },
      {
        slug: "typescript-mastery",
        title: "TypeScript Mastery",
        level: "Intermediate",
        duration: "1h 55m",
        progress: 28,
      },
      {
        slug: "product-design",
        title: "Product Design",
        level: "Beginner",
        duration: "1h 20m",
        progress: 12,
      },
      {
        slug: "testing-qa",
        title: "Testing & QA",
        level: "Advanced",
        duration: "1h 40m",
        progress: 70,
      },
    ])
    .returning();

  await db.insert(videoEpisodes).values([
    { seriesId: reactSeries.id, title: "Why React", sortOrder: 1 },
    { seriesId: reactSeries.id, title: "Components & JSX", sortOrder: 2 },
    { seriesId: reactSeries.id, title: "Props & State", sortOrder: 3 },
    { seriesId: reactSeries.id, title: "Hooks Overview", sortOrder: 4 },
    { seriesId: reactSeries.id, title: "Data Fetching", sortOrder: 5 },
    { seriesId: tsSeries.id, title: "Types & Interfaces", sortOrder: 1 },
    { seriesId: tsSeries.id, title: "Utility Types", sortOrder: 2 },
    { seriesId: tsSeries.id, title: "Generics", sortOrder: 3 },
    { seriesId: tsSeries.id, title: "Type Guards", sortOrder: 4 },
    { seriesId: tsSeries.id, title: "Project Setup", sortOrder: 5 },
    { seriesId: productSeries.id, title: "User Research", sortOrder: 1 },
    { seriesId: productSeries.id, title: "Personas", sortOrder: 2 },
    { seriesId: productSeries.id, title: "Wireframes", sortOrder: 3 },
    { seriesId: productSeries.id, title: "Prototyping", sortOrder: 4 },
    { seriesId: qaSeries.id, title: "Testing Strategy", sortOrder: 1 },
    { seriesId: qaSeries.id, title: "Unit Tests", sortOrder: 2 },
    { seriesId: qaSeries.id, title: "Integration Tests", sortOrder: 3 },
    { seriesId: qaSeries.id, title: "E2E Automation", sortOrder: 4 },
  ]);

  const [reactQuiz, tsQuiz, uiQuiz, apiQuiz] = await db
    .insert(quizzes)
    .values([
      { slug: "react-basics", title: "React Basics", level: "Easy", questions: 12, time: "12 min" },
      { slug: "typescript-deep-dive", title: "TypeScript Deep Dive", level: "Medium", questions: 16, time: "18 min" },
      { slug: "ui-architecture", title: "UI Architecture", level: "Hard", questions: 10, time: "15 min" },
      { slug: "api-essentials", title: "API Essentials", level: "Medium", questions: 14, time: "14 min" },
    ])
    .returning();

  await db.insert(quizTopics).values([
    { quizId: reactQuiz.id, title: "Components", sortOrder: 1 },
    { quizId: reactQuiz.id, title: "Props", sortOrder: 2 },
    { quizId: reactQuiz.id, title: "State", sortOrder: 3 },
    { quizId: reactQuiz.id, title: "Hooks", sortOrder: 4 },
    { quizId: tsQuiz.id, title: "Types", sortOrder: 1 },
    { quizId: tsQuiz.id, title: "Generics", sortOrder: 2 },
    { quizId: tsQuiz.id, title: "Guards", sortOrder: 3 },
    { quizId: tsQuiz.id, title: "Enums", sortOrder: 4 },
    { quizId: uiQuiz.id, title: "Design Systems", sortOrder: 1 },
    { quizId: uiQuiz.id, title: "Composition", sortOrder: 2 },
    { quizId: uiQuiz.id, title: "State", sortOrder: 3 },
    { quizId: uiQuiz.id, title: "Performance", sortOrder: 4 },
    { quizId: apiQuiz.id, title: "REST", sortOrder: 1 },
    { quizId: apiQuiz.id, title: "Auth", sortOrder: 2 },
    { quizId: apiQuiz.id, title: "GraphQL", sortOrder: 3 },
    { quizId: apiQuiz.id, title: "Testing", sortOrder: 4 },
  ]);

  // Add quiz questions
  await db.insert(quizQuestions).values([
    // React Basics Quiz
    {
      quizId: reactQuiz.id,
      question: "What is a React component?",
      optionA: "A JavaScript function or class that returns JSX",
      optionB: "A CSS stylesheet",
      optionC: "A database query",
      optionD: "An HTML template",
      correctAnswer: "A",
      sortOrder: 1,
    },
    {
      quizId: reactQuiz.id,
      question: "How do you pass data to a child component?",
      optionA: "Using state",
      optionB: "Using props",
      optionC: "Using context",
      optionD: "Using refs",
      correctAnswer: "B",
      sortOrder: 2,
    },
    {
      quizId: reactQuiz.id,
      question: "What hook is used to manage component state?",
      optionA: "useEffect",
      optionB: "useContext",
      optionC: "useState",
      optionD: "useRef",
      correctAnswer: "C",
      sortOrder: 3,
    },
    {
      quizId: reactQuiz.id,
      question: "What does useEffect do?",
      optionA: "Creates state variables",
      optionB: "Performs side effects in function components",
      optionC: "Passes data between components",
      optionD: "Renders JSX",
      correctAnswer: "B",
      sortOrder: 4,
    },
    // TypeScript Deep Dive Quiz
    {
      quizId: tsQuiz.id,
      question: "What is the difference between type and interface?",
      optionA: "They are identical",
      optionB: "Interfaces can be extended, types cannot",
      optionC: "Types are more flexible for unions and intersections",
      optionD: "Types are deprecated",
      correctAnswer: "C",
      sortOrder: 1,
    },
    {
      quizId: tsQuiz.id,
      question: "What is a generic in TypeScript?",
      optionA: "A type that works with any data type",
      optionB: "A built-in function",
      optionC: "A runtime check",
      optionD: "An error handler",
      correctAnswer: "A",
      sortOrder: 2,
    },
    {
      quizId: tsQuiz.id,
      question: "What does 'as const' do?",
      optionA: "Makes variables immutable",
      optionB: "Creates a readonly type assertion",
      optionC: "Declares a constant variable",
      optionD: "Defines a type guard",
      correctAnswer: "B",
      sortOrder: 3,
    },
    {
      quizId: tsQuiz.id,
      question: "What is a type guard?",
      optionA: "A security feature",
      optionB: "A function that narrows types at runtime",
      optionC: "A compiler option",
      optionD: "A linting rule",
      correctAnswer: "B",
      sortOrder: 4,
    },
    // UI Architecture Quiz
    {
      quizId: uiQuiz.id,
      question: "What is a design system?",
      optionA: "A collection of reusable components and patterns",
      optionB: "A CSS framework",
      optionC: "A design tool",
      optionD: "A color palette",
      correctAnswer: "A",
      sortOrder: 1,
    },
    {
      quizId: uiQuiz.id,
      question: "What is component composition?",
      optionA: "Writing CSS",
      optionB: "Building complex components from simpler ones",
      optionC: "Compiling code",
      optionD: "Testing components",
      correctAnswer: "B",
      sortOrder: 2,
    },
    {
      quizId: uiQuiz.id,
      question: "What helps prevent unnecessary re-renders?",
      optionA: "Using more state",
      optionB: "Removing all props",
      optionC: "React.memo and useMemo",
      optionD: "Inline functions",
      correctAnswer: "C",
      sortOrder: 3,
    },
    {
      quizId: uiQuiz.id,
      question: "What is prop drilling?",
      optionA: "Passing props through multiple layers",
      optionB: "A performance optimization",
      optionC: "A design pattern",
      optionD: "A testing technique",
      correctAnswer: "A",
      sortOrder: 4,
    },
    // API Essentials Quiz
    {
      quizId: apiQuiz.id,
      question: "What does REST stand for?",
      optionA: "Remote Execution of Simple Tasks",
      optionB: "Representational State Transfer",
      optionC: "Recursive Server Technology",
      optionD: "Real-time Event Streaming",
      correctAnswer: "B",
      sortOrder: 1,
    },
    {
      quizId: apiQuiz.id,
      question: "Which HTTP method is idempotent?",
      optionA: "POST",
      optionB: "PATCH",
      optionC: "PUT",
      optionD: "All of them",
      correctAnswer: "C",
      sortOrder: 2,
    },
    {
      quizId: apiQuiz.id,
      question: "What is GraphQL?",
      optionA: "A database",
      optionB: "A query language for APIs",
      optionC: "A graph database",
      optionD: "A SQL extension",
      correctAnswer: "B",
      sortOrder: 3,
    },
    {
      quizId: apiQuiz.id,
      question: "What is JWT used for?",
      optionA: "Database queries",
      optionB: "Authentication tokens",
      optionC: "Styling components",
      optionD: "Testing APIs",
      correctAnswer: "B",
      sortOrder: 4,
    },
  ]);

  const [frontendTopic, backendTopic, productTopic, careerTopic] = await db
    .insert(topics)
    .values([
      {
        slug: "frontend-essentials",
        title: "Frontend Essentials",
        description: "HTML, CSS, modern React patterns.",
        lessons: 24,
      },
      {
        slug: "backend-basics",
        title: "Backend Basics",
        description: "APIs, auth, and data modeling.",
        lessons: 18,
      },
      {
        slug: "product-ux",
        title: "Product & UX",
        description: "Design thinking and usability testing.",
        lessons: 12,
      },
      {
        slug: "career-prep",
        title: "Career Prep",
        description: "Portfolios, interviews, and soft skills.",
        lessons: 10,
      },
    ])
    .returning();

  await db.insert(topicSeries).values([
    { topicId: frontendTopic.id, seriesId: reactSeries.id },
    { topicId: frontendTopic.id, seriesId: tsSeries.id },
    { topicId: frontendTopic.id, seriesId: qaSeries.id },
    { topicId: backendTopic.id, seriesId: tsSeries.id },
    { topicId: backendTopic.id, seriesId: qaSeries.id },
    { topicId: productTopic.id, seriesId: productSeries.id },
    { topicId: productTopic.id, seriesId: reactSeries.id },
    { topicId: careerTopic.id, seriesId: tsSeries.id },
    { topicId: careerTopic.id, seriesId: qaSeries.id },
  ]);

  await db.insert(topicCourses).values([
    { topicId: frontendTopic.id, courseId: reactFoundations.id },
    { topicId: frontendTopic.id, courseId: designSystems.id },
    { topicId: backendTopic.id, courseId: apiEssentials.id },
    { topicId: productTopic.id, courseId: designSystems.id },
    { topicId: careerTopic.id, courseId: tsTeams.id },
  ]);

  await db.insert(topicQuizzes).values([
    { topicId: frontendTopic.id, quizId: reactQuiz.id },
    { topicId: frontendTopic.id, quizId: uiQuiz.id },
    { topicId: backendTopic.id, quizId: apiQuiz.id },
    { topicId: productTopic.id, quizId: uiQuiz.id },
    { topicId: careerTopic.id, quizId: tsQuiz.id },
  ]);

  const [sprintPost, microPost, quizPost, notesPost] = await db
    .insert(blogPosts)
    .values([
      {
        slug: "weekly-learning-sprint",
        title: "How to plan a weekly learning sprint",
        tag: "Study Tips",
        readTime: "6 min read",
        summary: "Turn large learning goals into a weekly plan you can actually follow.",
      },
      {
        slug: "micro-projects-retention",
        title: "Micro-projects that boost retention",
        tag: "Practice",
        readTime: "4 min read",
        summary: "Short projects help you apply what you just learned.",
      },
      {
        slug: "quizzes-vs-flashcards",
        title: "Quizzes vs. flashcards: what works",
        tag: "Assessment",
        readTime: "5 min read",
        summary: "Both tools help retention; mix them for best results.",
      },
      {
        slug: "design-notes-recall",
        title: "Design notes for better recall",
        tag: "Notes",
        readTime: "7 min read",
        summary: "Lightweight notes make review faster and more enjoyable.",
      },
    ])
    .returning();

  await db.insert(blogContents).values([
    { postId: sprintPost.id, body: "Start by choosing one focus topic and two supporting lessons.", sortOrder: 1 },
    { postId: sprintPost.id, body: "Schedule three short sessions instead of a single long block.", sortOrder: 2 },
    { postId: sprintPost.id, body: "End the week with a quiz or a reflection journal to reinforce retention.", sortOrder: 3 },
    { postId: microPost.id, body: "Define a tiny output: a component, a script, or a diagram.", sortOrder: 1 },
    { postId: microPost.id, body: "Ship something in 30-45 minutes to reduce cognitive load.", sortOrder: 2 },
    { postId: microPost.id, body: "Review and refactor the next day for spaced repetition.", sortOrder: 3 },
    { postId: quizPost.id, body: "Quizzes measure recall under time pressure.", sortOrder: 1 },
    { postId: quizPost.id, body: "Flashcards help with vocabulary and definitions.", sortOrder: 2 },
    { postId: quizPost.id, body: "Pair them: quiz after a lesson, flashcards between sessions.", sortOrder: 3 },
    { postId: notesPost.id, body: "Use headers, bullets, and visuals to chunk information.", sortOrder: 1 },
    { postId: notesPost.id, body: "Add a 2-line summary at the end of each page.", sortOrder: 2 },
    { postId: notesPost.id, body: "Revisit notes at the end of the week to solidify memory.", sortOrder: 3 },
  ]);

  await db.insert(libraryItems).values([
    {
      title: "React Foundations",
      type: "Course",
      note: "Resume at Lesson 8",
      href: "/dashboard/courses/react-foundations",
    },
    {
      title: "Quizzes that boost retention",
      type: "Blog",
      note: "Saved for weekend",
      href: "/dashboard/blog/quizzes-vs-flashcards",
    },
    {
      title: "TypeScript Deep Dive",
      type: "Video Series",
      note: "Next episode: Generics",
      href: "/dashboard/videos/typescript-mastery",
    },
  ]);

  const courseIds = [reactFoundations.id, tsTeams.id, designSystems.id, apiEssentials.id];
  const seriesIds = [reactSeries.id, tsSeries.id, productSeries.id, qaSeries.id];
  const quizIds = [reactQuiz.id, tsQuiz.id, uiQuiz.id, apiQuiz.id];
  const topicIds = [frontendTopic.id, backendTopic.id, productTopic.id, careerTopic.id];

  console.log("✅ Seed complete:", {
    courses: courseIds.length,
    series: seriesIds.length,
    quizzes: quizIds.length,
    topics: topicIds.length,
    posts: 4,
  });
}

seed()
  .catch((error) => {
    console.error("❌ Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await client.end();
  });
