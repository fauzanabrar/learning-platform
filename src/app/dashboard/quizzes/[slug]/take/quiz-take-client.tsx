"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type QuizQuestion = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type QuizData = {
  slug: string;
  title: string;
  questionsData: QuizQuestion[];
};

export default function QuizTakeClient({ 
  quiz,
}: { 
  quiz: QuizData;
}) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = quiz.questionsData.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQuestionData = quiz.questionsData[currentQuestion];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestionData.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("slug", quiz.slug);
    formData.append("answers", JSON.stringify(answers));

    const response = await fetch(`/api/quiz/submit`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/dashboard/quizzes/${quiz.slug}/results?attemptId=${data.attemptId}`);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const canSubmit = answeredCount === totalQuestions;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <span className="text-sm text-muted-foreground">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardDescription>
            Question {currentQuestion + 1} of {totalQuestions}
          </CardDescription>
          <CardTitle className="text-lg">{currentQuestionData.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup 
            value={answers[currentQuestionData.id] || ""} 
            onValueChange={handleAnswerChange}
          >
            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent">
              <RadioGroupItem value="A" id={`${currentQuestionData.id}-A`} />
              <Label 
                htmlFor={`${currentQuestionData.id}-A`} 
                className="flex-1 cursor-pointer text-sm font-normal"
              >
                {currentQuestionData.optionA}
              </Label>
            </div>
            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent">
              <RadioGroupItem value="B" id={`${currentQuestionData.id}-B`} />
              <Label 
                htmlFor={`${currentQuestionData.id}-B`} 
                className="flex-1 cursor-pointer text-sm font-normal"
              >
                {currentQuestionData.optionB}
              </Label>
            </div>
            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent">
              <RadioGroupItem value="C" id={`${currentQuestionData.id}-C`} />
              <Label 
                htmlFor={`${currentQuestionData.id}-C`} 
                className="flex-1 cursor-pointer text-sm font-normal"
              >
                {currentQuestionData.optionC}
              </Label>
            </div>
            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent">
              <RadioGroupItem value="D" id={`${currentQuestionData.id}-D`} />
              <Label 
                htmlFor={`${currentQuestionData.id}-D`} 
                className="flex-1 cursor-pointer text-sm font-normal"
              >
                {currentQuestionData.optionD}
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentQuestion < totalQuestions - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {quiz.questionsData.map((q, index) => (
              <Button
                key={q.id}
                variant={currentQuestion === index ? "default" : answers[q.id] ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className="h-8 w-8 p-0"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
