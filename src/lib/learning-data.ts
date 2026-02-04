import { asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
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
} from "@/db/schema";

export type Course = {
  slug: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  modules: string[];
  quiz: string;
};

export type VideoSeries = {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  progress: number;
  episodes: string[];
};

export type Quiz = {
  slug: string;
  title: string;
  level: "Easy" | "Medium" | "Hard";
  questions: number;
  time: string;
  topics: string[];
};

export type Topic = {
  slug: string;
  title: string;
  description: string;
  lessons: number;
  series: { title: string; slug: string }[];
  courses: { title: string; slug: string }[];
  quizzes: { title: string; slug: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  summary: string;
  content: string[];
};

export type LibraryItem = {
  title: string;
  type: "Course" | "Blog" | "Video Series";
  note: string;
  href: string;
};
export async function getCourses(): Promise<Course[]> {
  const courseRows = await db.select().from(courses).orderBy(asc(courses.title));
  const courseIds = courseRows.map((course) => course.id);
  const moduleRows = courseIds.length
    ? await db.select().from(courseModules).where(inArray(courseModules.courseId, courseIds)).orderBy(asc(courseModules.sortOrder))
    : [];

  const modulesByCourse = moduleRows.reduce<Record<string, string[]>>((acc, module) => {
    acc[module.courseId] = acc[module.courseId] ?? [];
    acc[module.courseId].push(module.title);
    return acc;
  }, {});

  return courseRows.map((course) => ({
    slug: course.slug,
    title: course.title,
    description: course.description,
    lessons: course.lessons,
    duration: course.duration,
    level: course.level as Course["level"],
    progress: course.progress,
    modules: modulesByCourse[course.id] ?? [],
    quiz: course.quizSlug,
  }));
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const course = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  if (course.length === 0) {
    return null;
  }

  const [row] = course;
  const modules = await db
    .select()
    .from(courseModules)
    .where(eq(courseModules.courseId, row.id))
    .orderBy(asc(courseModules.sortOrder));

  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    lessons: row.lessons,
    duration: row.duration,
    level: row.level as Course["level"],
    progress: row.progress,
    modules: modules.map((module) => module.title),
    quiz: row.quizSlug,
  };
}

export async function getVideoSeries(): Promise<VideoSeries[]> {
  const seriesRows = await db.select().from(videoSeries).orderBy(asc(videoSeries.title));
  const seriesIds = seriesRows.map((series) => series.id);
  const episodeRows = seriesIds.length
    ? await db.select().from(videoEpisodes).where(inArray(videoEpisodes.seriesId, seriesIds)).orderBy(asc(videoEpisodes.sortOrder))
    : [];

  const episodesBySeries = episodeRows.reduce<Record<string, string[]>>((acc, episode) => {
    acc[episode.seriesId] = acc[episode.seriesId] ?? [];
    acc[episode.seriesId].push(episode.title);
    return acc;
  }, {});

  return seriesRows.map((series) => ({
    slug: series.slug,
    title: series.title,
    level: series.level as VideoSeries["level"],
    duration: series.duration,
    progress: series.progress,
    episodes: episodesBySeries[series.id] ?? [],
  }));
}

export async function getVideoSeriesBySlug(slug: string): Promise<VideoSeries | null> {
  const seriesRows = await db.select().from(videoSeries).where(eq(videoSeries.slug, slug)).limit(1);
  if (seriesRows.length === 0) {
    return null;
  }

  const [series] = seriesRows;
  const episodes = await db
    .select()
    .from(videoEpisodes)
    .where(eq(videoEpisodes.seriesId, series.id))
    .orderBy(asc(videoEpisodes.sortOrder));

  return {
    slug: series.slug,
    title: series.title,
    level: series.level as VideoSeries["level"],
    duration: series.duration,
    progress: series.progress,
    episodes: episodes.map((episode) => episode.title),
  };
}

export async function getQuizzes(): Promise<Quiz[]> {
  const quizRows = await db.select().from(quizzes).orderBy(asc(quizzes.title));
  const quizIds = quizRows.map((quiz) => quiz.id);
  const topicRows = quizIds.length
    ? await db.select().from(quizTopics).where(inArray(quizTopics.quizId, quizIds)).orderBy(asc(quizTopics.sortOrder))
    : [];

  const topicsByQuiz = topicRows.reduce<Record<string, string[]>>((acc, topic) => {
    acc[topic.quizId] = acc[topic.quizId] ?? [];
    acc[topic.quizId].push(topic.title);
    return acc;
  }, {});

  return quizRows.map((quiz) => ({
    slug: quiz.slug,
    title: quiz.title,
    level: quiz.level as Quiz["level"],
    questions: quiz.questions,
    time: quiz.time,
    topics: topicsByQuiz[quiz.id] ?? [],
  }));
}

export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  const quizRows = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
  if (quizRows.length === 0) {
    return null;
  }

  const [quiz] = quizRows;
  const topics = await db
    .select()
    .from(quizTopics)
    .where(eq(quizTopics.quizId, quiz.id))
    .orderBy(asc(quizTopics.sortOrder));

  return {
    slug: quiz.slug,
    title: quiz.title,
    level: quiz.level as Quiz["level"],
    questions: quiz.questions,
    time: quiz.time,
    topics: topics.map((topic) => topic.title),
  };
}

export type QuizQuestion = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

export async function getQuizQuestions(slug: string): Promise<QuizQuestion[] | null> {
  const quizRows = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
  if (quizRows.length === 0) {
    return null;
  }

  const [quiz] = quizRows;
  const questions = await db
    .select({
      id: quizQuestions.id,
      question: quizQuestions.question,
      optionA: quizQuestions.optionA,
      optionB: quizQuestions.optionB,
      optionC: quizQuestions.optionC,
      optionD: quizQuestions.optionD,
    })
    .from(quizQuestions)
    .where(eq(quizQuestions.quizId, quiz.id))
    .orderBy(asc(quizQuestions.sortOrder));

  return questions;
}

export async function getQuizWithQuestions(slug: string) {
  const quiz = await getQuizBySlug(slug);
  if (!quiz) return null;
  
  const questions = await getQuizQuestions(slug);
  if (!questions) return null;

  return { ...quiz, questionsData: questions };
}

export async function getLatestQuizAttempt(slug: string) {
  const quizRows = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
  if (quizRows.length === 0) {
    return null;
  }

  const [quiz] = quizRows;
  const attempts = await db
    .select()
    .from(quizAttempts)
    .where(eq(quizAttempts.quizId, quiz.id))
    .orderBy(desc(quizAttempts.completedAt))
    .limit(1);

  return attempts.length > 0 ? attempts[0] : null;
}

export async function getTopics(): Promise<Topic[]> {
  const topicRows = await db.select().from(topics).orderBy(asc(topics.title));
  const topicIds = topicRows.map((topic) => topic.id);

  const seriesLinks = topicIds.length
    ? await db.select().from(topicSeries).where(inArray(topicSeries.topicId, topicIds))
    : [];
  const courseLinks = topicIds.length
    ? await db.select().from(topicCourses).where(inArray(topicCourses.topicId, topicIds))
    : [];
  const quizLinks = topicIds.length
    ? await db.select().from(topicQuizzes).where(inArray(topicQuizzes.topicId, topicIds))
    : [];

  const seriesIds = [...new Set(seriesLinks.map((link) => link.seriesId))];
  const courseIds = [...new Set(courseLinks.map((link) => link.courseId))];
  const quizIds = [...new Set(quizLinks.map((link) => link.quizId))];

  const seriesRows = seriesIds.length
    ? await db.select().from(videoSeries).where(inArray(videoSeries.id, seriesIds))
    : [];
  const courseRows = courseIds.length
    ? await db.select().from(courses).where(inArray(courses.id, courseIds))
    : [];
  const quizRows = quizIds.length
    ? await db.select().from(quizzes).where(inArray(quizzes.id, quizIds))
    : [];

  const seriesById = new Map(seriesRows.map((row) => [row.id, row]));
  const coursesById = new Map(courseRows.map((row) => [row.id, row]));
  const quizzesById = new Map(quizRows.map((row) => [row.id, row]));

  return topicRows.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    lessons: topic.lessons,
    series: seriesLinks
      .filter((link) => link.topicId === topic.id)
      .map((link) => {
        const row = seriesById.get(link.seriesId);
        return row ? { title: row.title, slug: row.slug } : null;
      })
      .filter((item): item is { title: string; slug: string } => Boolean(item)),
    courses: courseLinks
      .filter((link) => link.topicId === topic.id)
      .map((link) => {
        const row = coursesById.get(link.courseId);
        return row ? { title: row.title, slug: row.slug } : null;
      })
      .filter((item): item is { title: string; slug: string } => Boolean(item)),
    quizzes: quizLinks
      .filter((link) => link.topicId === topic.id)
      .map((link) => {
        const row = quizzesById.get(link.quizId);
        return row ? { title: row.title, slug: row.slug } : null;
      })
      .filter((item): item is { title: string; slug: string } => Boolean(item)),
  }));
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  const topicRows = await db.select().from(topics).where(eq(topics.slug, slug)).limit(1);
  if (topicRows.length === 0) {
    return null;
  }

  const [topic] = topicRows;
  const [seriesLinks, courseLinks, quizLinks] = await Promise.all([
    db.select().from(topicSeries).where(eq(topicSeries.topicId, topic.id)),
    db.select().from(topicCourses).where(eq(topicCourses.topicId, topic.id)),
    db.select().from(topicQuizzes).where(eq(topicQuizzes.topicId, topic.id)),
  ]);

  const seriesIds = seriesLinks.map((link) => link.seriesId);
  const courseIds = courseLinks.map((link) => link.courseId);
  const quizIds = quizLinks.map((link) => link.quizId);

  const [seriesRows, courseRows, quizRows] = await Promise.all([
    seriesIds.length ? db.select().from(videoSeries).where(inArray(videoSeries.id, seriesIds)) : [],
    courseIds.length ? db.select().from(courses).where(inArray(courses.id, courseIds)) : [],
    quizIds.length ? db.select().from(quizzes).where(inArray(quizzes.id, quizIds)) : [],
  ]);

  const seriesById = new Map(seriesRows.map((row) => [row.id, row]));
  const coursesById = new Map(courseRows.map((row) => [row.id, row]));
  const quizzesById = new Map(quizRows.map((row) => [row.id, row]));

  return {
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    lessons: topic.lessons,
    series: seriesLinks
      .map((link) => {
        const row = seriesById.get(link.seriesId);
        return row ? { title: row.title, slug: row.slug } : null;
      })
      .filter((item): item is { title: string; slug: string } => Boolean(item)),
    courses: courseLinks
      .map((link) => {
        const row = coursesById.get(link.courseId);
        return row ? { title: row.title, slug: row.slug } : null;
      })
      .filter((item): item is { title: string; slug: string } => Boolean(item)),
    quizzes: quizLinks
      .map((link) => {
        const row = quizzesById.get(link.quizId);
        return row ? { title: row.title, slug: row.slug } : null;
      })
      .filter((item): item is { title: string; slug: string } => Boolean(item)),
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const postRows = await db.select().from(blogPosts).orderBy(asc(blogPosts.createdAt));
  const postIds = postRows.map((post) => post.id);
  const contentRows = postIds.length
    ? await db.select().from(blogContents).where(inArray(blogContents.postId, postIds)).orderBy(asc(blogContents.sortOrder))
    : [];

  const contentByPost = contentRows.reduce<Record<string, string[]>>((acc, content) => {
    acc[content.postId] = acc[content.postId] ?? [];
    acc[content.postId].push(content.body);
    return acc;
  }, {});

  return postRows.map((post) => ({
    slug: post.slug,
    title: post.title,
    tag: post.tag,
    readTime: post.readTime,
    summary: post.summary,
    content: contentByPost[post.id] ?? [],
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const postRows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (postRows.length === 0) {
    return null;
  }

  const [post] = postRows;
  const contentRows = await db
    .select()
    .from(blogContents)
    .where(eq(blogContents.postId, post.id))
    .orderBy(asc(blogContents.sortOrder));

  return {
    slug: post.slug,
    title: post.title,
    tag: post.tag,
    readTime: post.readTime,
    summary: post.summary,
    content: contentRows.map((content) => content.body),
  };
}

export async function getLibraryItems(): Promise<LibraryItem[]> {
  const items = await db.select().from(libraryItems).orderBy(asc(libraryItems.createdAt));
  return items.map((item) => ({
    title: item.title,
    type: item.type as LibraryItem["type"],
    note: item.note,
    href: item.href,
  }));
}
