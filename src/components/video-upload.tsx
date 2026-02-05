"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, CheckCircle2, AlertCircle, Link as LinkIcon, Eye } from "lucide-react";
import { useState } from "react";

interface VideoUploadProps {
  videoUrl: string;
  onUpload: (url: string) => void;
  uploadStatus?: "idle" | "uploading" | "done" | "error";
}

export function VideoUpload({ videoUrl, onUpload, uploadStatus }: VideoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [urlInput, setUrlInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleRemove = () => {
    onUpload("");
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onUpload(urlInput.trim());
      setUrlInput("");
    }
  };

  const getThumbnailUrl = (url: string) => {
    if (!url.includes("cloudinary.com")) return null;
    // Extract public_id from Cloudinary URL and generate thumbnail
    return url.replace(/\/upload\//, "/upload/w_200,h_112,c_fill,q_auto/").replace(/\.\w+$/, ".jpg");
  };

  const thumbnail = videoUrl ? getThumbnailUrl(videoUrl) : null;

  return (
    <>
      <div className="space-y-3">
        {videoUrl && uploadStatus !== "uploading" ? (
          <Card className="overflow-hidden border-2 border-green-200 bg-green-50">
            <div className="flex items-center gap-3 p-4">
              <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded bg-black">
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt="Video thumbnail"
                    className="h-full w-full object-cover"
                  />
                )}
                {!thumbnail && (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-black">
                    <LinkIcon className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <p className="text-sm font-medium text-green-900">Upload Complete</p>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-green-700 break-all">{videoUrl}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPreview(true)}
                  className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                  title="Preview video"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {/* Mode Selector */}
            <div className="flex gap-2 border-b">
              <button
                type="button"
                onClick={() => setUploadMode("file")}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  uploadMode === "file"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Upload className="inline mr-2 h-4 w-4" />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setUploadMode("url")}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  uploadMode === "url"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <LinkIcon className="inline mr-2 h-4 w-4" />
                Use URL
              </button>
            </div>

            {/* File Upload Mode */}
            {uploadMode === "file" && (
              <CldUploadWidget
                uploadPreset="ml_default"
                options={{
                  resourceType: "video",
                  folder: "learning-platform/videos",
                  maxFileSize: 100000000000,
                  sources: ["local"],
                  multiple: false,
                  maxFiles: 1,
                  showCompletedButton: true,
                }}
                onSuccess={(result: any) => {
                  onUpload(result.info.secure_url);
                }}
              >
                {({ open, isLoading }) => (
                  <Card
                    className={`cursor-pointer border-2 border-dashed transition-all ${
                      isDragOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      const files = e.dataTransfer.files;
                      if (files.length > 0) {
                        open();
                      }
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
                      <div className={`rounded-full p-3 ${isDragOver ? "bg-blue-100" : "bg-gray-100"}`}>
                        <Upload
                          className={`h-6 w-6 ${isDragOver ? "text-blue-600" : "text-gray-600"}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {isLoading ? "Uploading..." : "Drag your video here"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {isLoading
                            ? "Please wait while your video is being uploaded to Cloudinary"
                            : "or click to browse from your computer"}
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                          MP4, WebM, OGG • Max 100GB
                        </p>
                      </div>
                      {!isLoading && (
                        <Button
                          type="button"
                          onClick={() => open()}
                          className="mt-2"
                          disabled={isLoading}
                        >
                          Select Video
                        </Button>
                      )}
                      {isLoading && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                          <span className="text-xs text-gray-600">Uploading...</span>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </CldUploadWidget>
            )}

            {/* URL Mode */}
            {uploadMode === "url" && (
              <Card className="border-2 border-gray-200 p-4 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUrlSubmit();
                      }
                    }}
                    placeholder="https://example.com/video.mp4"
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    Enter a direct link to an .mp4, .webm, or .ogg video file
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="w-full"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Add URL
                </Button>
              </Card>
            )}
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
            <p className="text-xs text-red-600">Upload failed. Please try again.</p>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {showPreview && videoUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Video Preview</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPreview(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
            <div className="p-4 border-t space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">URL:</span> {videoUrl}
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Looks Good
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
