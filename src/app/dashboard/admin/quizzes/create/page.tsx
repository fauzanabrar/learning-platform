"use client";

import { Button } from "@/components/ui/button";
import { ConfirmBackDialog } from "@/components/common/confirm-back-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createQuiz } from "@/lib/quiz-actions";

type Question = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
};

export default function CreateQuizPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topics, setTopics] = useState<string[]>([""]);
  const [questions, setQuestions] = useState<Question[]>([{
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A"
  }]);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  const addTopic = () => setTopics([...topics, ""]);
  const removeTopic = (index: number) => setTopics(topics.filter((_, i) => i !== index));
  const updateTopic = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const addQuestion = () => setQuestions([...questions, { question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "A" }]);
  const removeQuestion = (index: number) => setQuestions(questions.filter((_, i) => i !== index));
  const updateQuestion = (index: number, field: keyof Question, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const hasDirtyInputs = () => {
    const form = formRef.current;
    const formData = form ? new FormData(form) : null;
    const hasFormValues = formData
      ? Array.from(formData.values()).some((value) => String(value).trim() !== "")
      : false;
    const hasTopicValues = topics.some((topic) => topic.trim() !== "");
    const hasQuestionValues = questions.some((question) =>
      [
        question.question,
        question.optionA,
        question.optionB,
        question.optionC,
        question.optionD,
      ].some((value) => value.trim() !== "")
    );
    return hasFormValues || hasTopicValues || hasQuestionValues;
  };

  const handleBack = () => {
    if (hasDirtyInputs()) {
      setShowBackConfirm(true);
      return;
    }
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("topics", JSON.stringify(topics.filter(t => t.trim() !== "")));
    formData.append("questions", JSON.stringify(questions.filter(q => q.question.trim() !== "")));

    startTransition(async () => {
      try {
        const result = await createQuiz(formData);
        if (result.success) {
          router.push(`/dashboard/quizzes/${result.slug}`);
        } else {
          setError(result.error || "Failed to create quiz");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Quiz</h1>
          <p className="text-muted-foreground">Add a new quiz with questions</p>
        </div>
        <Button type="button" variant="outline" onClick={handleBack} disabled={isPending}>
          Back
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input id="title" name="title" placeholder="React Basics" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug*</Label>
                <Input id="slug" name="slug" placeholder="react-basics" pattern="[a-z0-9-]+" required />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="level">Level*</Label>
                <Select name="level" required>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Estimated Time*</Label>
                <Input id="time" name="time" placeholder="12 min" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Topics</CardTitle>
            <CardDescription>Add topics covered in this quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topics.map((topic, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={topic}
                    onChange={(e) => updateTopic(index, e.target.value)}
                    placeholder={`Topic ${index + 1}`}
                  />
                </div>
                {topics.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTopic(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addTopic} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Topic
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>Add quiz questions with multiple choice answers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((q, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Question {index + 1}</CardTitle>
                    {questions.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question*</Label>
                    <Textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(index, "question", e.target.value)}
                      placeholder="What is React?"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Option A*</Label>
                      <Input
                        value={q.optionA}
                        onChange={(e) => updateQuestion(index, "optionA", e.target.value)}
                        placeholder="Option A"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Option B*</Label>
                      <Input
                        value={q.optionB}
                        onChange={(e) => updateQuestion(index, "optionB", e.target.value)}
                        placeholder="Option B"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Option C*</Label>
                      <Input
                        value={q.optionC}
                        onChange={(e) => updateQuestion(index, "optionC", e.target.value)}
                        placeholder="Option C"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Option D*</Label>
                      <Input
                        value={q.optionD}
                        onChange={(e) => updateQuestion(index, "optionD", e.target.value)}
                        placeholder="Option D"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Correct Answer*</Label>
                    <Select value={q.correctAnswer} onValueChange={(v) => updateQuestion(index, "correctAnswer", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Option A</SelectItem>
                        <SelectItem value="B">Option B</SelectItem>
                        <SelectItem value="C">Option C</SelectItem>
                        <SelectItem value="D">Option D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button type="button" variant="outline" onClick={addQuestion} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" onClick={handleBack} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Quiz"}
          </Button>
        </div>
      </form>
      <ConfirmBackDialog
        open={showBackConfirm}
        onOpenChange={setShowBackConfirm}
        onConfirm={() => router.back()}
      />
    </div>
  );
}
