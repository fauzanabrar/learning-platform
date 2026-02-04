import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: text('username').notNull().unique(),
    email: text('email'), // Optional email
    password: text('password').notNull(),
    name: text('name'),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const courses = pgTable('courses', {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    lessons: integer('lessons').notNull(),
    duration: text('duration').notNull(),
    level: text('level').notNull(),
    progress: integer('progress').notNull().default(0),
    quizSlug: text('quiz_slug').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const courseModules = pgTable('course_modules', {
    id: uuid('id').defaultRandom().primaryKey(),
    courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    sortOrder: integer('sort_order').notNull(),
});

export const videoSeries = pgTable('video_series', {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    level: text('level').notNull(),
    duration: text('duration').notNull(),
    progress: integer('progress').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const videoEpisodes = pgTable('video_episodes', {
    id: uuid('id').defaultRandom().primaryKey(),
    seriesId: uuid('series_id').notNull().references(() => videoSeries.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    sortOrder: integer('sort_order').notNull(),
});

export const quizzes = pgTable('quizzes', {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    level: text('level').notNull(),
    questions: integer('questions').notNull(),
    time: text('time').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const quizTopics = pgTable('quiz_topics', {
    id: uuid('id').defaultRandom().primaryKey(),
    quizId: uuid('quiz_id').notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    sortOrder: integer('sort_order').notNull(),
});

export const quizQuestions = pgTable('quiz_questions', {
    id: uuid('id').defaultRandom().primaryKey(),
    quizId: uuid('quiz_id').notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
    question: text('question').notNull(),
    optionA: text('option_a').notNull(),
    optionB: text('option_b').notNull(),
    optionC: text('option_c').notNull(),
    optionD: text('option_d').notNull(),
    correctAnswer: text('correct_answer').notNull(), // A, B, C, or D
    sortOrder: integer('sort_order').notNull(),
});

export const quizAttempts = pgTable('quiz_attempts', {
    id: uuid('id').defaultRandom().primaryKey(),
    quizId: uuid('quiz_id').notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
    score: integer('score').notNull(),
    totalQuestions: integer('total_questions').notNull(),
    percentage: integer('percentage').notNull(),
    completedAt: timestamp('completed_at').defaultNow().notNull(),
});

export const topics = pgTable('topics', {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    lessons: integer('lessons').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const topicSeries = pgTable('topic_series', {
    id: uuid('id').defaultRandom().primaryKey(),
    topicId: uuid('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
    seriesId: uuid('series_id').notNull().references(() => videoSeries.id, { onDelete: 'cascade' }),
});

export const topicCourses = pgTable('topic_courses', {
    id: uuid('id').defaultRandom().primaryKey(),
    topicId: uuid('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
    courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
});

export const topicQuizzes = pgTable('topic_quizzes', {
    id: uuid('id').defaultRandom().primaryKey(),
    topicId: uuid('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
    quizId: uuid('quiz_id').notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
});

export const blogPosts = pgTable('blog_posts', {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    tag: text('tag').notNull(),
    readTime: text('read_time').notNull(),
    summary: text('summary').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const blogContents = pgTable('blog_contents', {
    id: uuid('id').defaultRandom().primaryKey(),
    postId: uuid('post_id').notNull().references(() => blogPosts.id, { onDelete: 'cascade' }),
    body: text('body').notNull(),
    sortOrder: integer('sort_order').notNull(),
});

export const libraryItems = pgTable('library_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    type: text('type').notNull(),
    note: text('note').notNull(),
    href: text('href').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Course = typeof courses.$inferSelect;
export type CourseModule = typeof courseModules.$inferSelect;
export type VideoSeries = typeof videoSeries.$inferSelect;
export type VideoEpisode = typeof videoEpisodes.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type QuizTopic = typeof quizTopics.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type Topic = typeof topics.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogContent = typeof blogContents.$inferSelect;
export type LibraryItem = typeof libraryItems.$inferSelect;
