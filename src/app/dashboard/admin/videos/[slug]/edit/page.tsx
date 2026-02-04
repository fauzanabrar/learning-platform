import { notFound } from "next/navigation";
import { getVideoSeriesAdminBySlug } from "@/lib/learning-data";
import VideoSeriesEditForm from "./video-series-edit-form";

export default async function EditVideoSeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = await getVideoSeriesAdminBySlug(slug);

  if (!series) {
    notFound();
  }

  return <VideoSeriesEditForm series={series} />;
}