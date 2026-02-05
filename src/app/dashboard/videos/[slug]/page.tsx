import { notFound } from "next/navigation";
import { getVideoSeriesBySlug } from "@/lib/learning-data";
import VideoSeriesClient from "./video-series-client";

export default async function VideoSeriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const current = await getVideoSeriesBySlug(slug);

  if (!current) {
    notFound();
  }

  return <VideoSeriesClient series={current} />;
}
