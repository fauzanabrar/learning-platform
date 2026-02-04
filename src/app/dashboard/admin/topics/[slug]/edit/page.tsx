import { notFound } from "next/navigation";
import { getTopicAdminBySlug } from "@/lib/learning-data";
import TopicEditForm from "./topic-edit-form";

export default async function EditTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await getTopicAdminBySlug(slug);

  if (!topic) {
    notFound();
  }

  return <TopicEditForm topic={topic} />;
}