import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type FormData = {
  fullName: string;
  projectName: string;
  shortDescription: string;
  helpNeeded: string;
  email: string;
  github: string;
  telegram: string;
};

const initialState: FormData = {
  fullName: "",
  projectName: "",
  shortDescription: "",
  helpNeeded: "",
  email: "",
  github: "",
  telegram: "",
};

const countWords = (value: string) =>
  value.trim() ? value.trim().split(/\s+/).length : 0;

const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.22em] text-fuchsia-700";

const inputClass =
  "h-12 rounded-none border border-fuchsia-200 bg-white px-3 font-mono text-base text-zinc-900 placeholder:font-sans placeholder:text-base placeholder:text-zinc-400 shadow-none transition focus-visible:ring-0 focus-visible:border-fuchsia-500";

const textareaClass =
  "h-[140px] rounded-none border border-fuchsia-200 bg-white px-3 py-3 font-mono text-base leading-relaxed text-zinc-900 placeholder:font-sans placeholder:text-base placeholder:leading-relaxed placeholder:text-zinc-400 shadow-none resize-none overflow-y-auto transition focus-visible:ring-0 focus-visible:border-fuchsia-500";
const helperClass =
  "font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400";

export function ApplyForm() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      let result: any = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { error: text || "Invalid server response" };
      }

      if (!response.ok) {
        throw new Error(result?.error || `Request failed with ${response.status}`);
      }

      setSuccessMessage("APPLICATION_SUBMITTED — REDIRECTING...");
      setFormData(initialState);
      window.location.href = "/apply/thank-you";
      return;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setErrorMessage(message.toUpperCase());
      setIsSubmitting(false);
    }
  };

  return (
    
    <Card className="relative overflow-hidden rounded-none border border-fuchsia-200 bg-white text-zinc-900 shadow-[0_0_0_1px_rgba(217,70,239,0.04)]">
  <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(217,70,239,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.45)_1px,transparent_1px)] [background-size:22px_22px]" />

  <CardHeader className="relative border-b border-fuchsia-200 px-5 pt-4 pb-3 md:px-8 md:pt-6 md:pb-4">
    <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fuchsia-600">
              thinkin&apos;rocks/apply
            </p>
            <h2 className="mt-2 font-mono text-xl uppercase tracking-[0.06em] text-zinc-900 md:text-2xl">
              Tell us what you&apos;re building
            </h2>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-fuchsia-700">
              STATUS:OPEN
            </span>
            <span className="text-zinc-400">cohort_01</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative px-5 pt-5 pb-6 md:px-8 md:pt-6 md:pb-8">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2">
            <Label htmlFor="fullName" className={labelClass}>
              [01] Full name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={updateField("fullName")}
              required
              className={inputClass}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectName" className={labelClass}>
              [02] Project name
            </Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={updateField("projectName")}
              required
              className={inputClass}
              placeholder="What is your project called?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription" className={labelClass}>
              [03] Short description
            </Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={updateField("shortDescription")}
              required
              rows={4}
              className={textareaClass}
              placeholder="Describe your project in a few sentences, what are you building, for whom, and what stage is it at?"
            />
            <div className="flex items-center justify-between gap-4">
            <p className={helperClass}>
                #what problem do you want to solve?
              </p>
              <p className={helperClass}>
                words: {countWords(formData.shortDescription)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="helpNeeded" className={labelClass}>
              [04] What help do you need?
            </Label>
            <Textarea
              id="helpNeeded"
              value={formData.helpNeeded}
              onChange={updateField("helpNeeded")}
              required
              rows={4}
              className={textareaClass}
              placeholder="Tell us what would help you move faster: equipment, lab access, technical support, collaborators, feedback, workspace, or something else."
            />
            <div className="flex items-center justify-between gap-4">
              <p className={helperClass}>
                #mention specific tools or bottlenecks
              </p>
              <p className={helperClass}>
                words: {countWords(formData.helpNeeded)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              [05] Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={updateField("email")}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegram" className={labelClass}>
              [06] Telegram{" "}
              <span className="normal-case tracking-normal text-zinc-400">
                optional
              </span>
            </Label>
            <Input
              id="telegram"
              value={formData.telegram}
              onChange={updateField("telegram")}
              className={inputClass}
              placeholder="@yourtelegram"
            />
            <p className={helperClass}>#best for fast follow up</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="github" className={labelClass}>
              [07] GitHub{" "}
              <span className="normal-case tracking-normal text-zinc-400">
                optional
              </span>
            </Label>
            <Input
              id="github"
              value={formData.github}
              onChange={updateField("github")}
              className={inputClass}
              placeholder="https://github.com/yourname or @yourname"
            />

          </div>

          {(errorMessage || successMessage) && (
            <div
              className={`font-mono text-xs uppercase tracking-[0.14em] border bg-fuchsia-50 px-4 py-3 ${
                errorMessage
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-fuchsia-200  text-fuchsia-700"
              }`}
            >
              {errorMessage || successMessage}
            </div>
          )}

          <div className="flex flex-col gap-4 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
              #deadline: 31 may
            </p>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-none border border-fuchsia-300 bg-fuchsia-50 px-5 font-mono text-xs uppercase tracking-[0.18em] text-fuchsia-700 shadow-none transition hover:bg-fuchsia-100 hover:text-fuchsia-800 disabled:opacity-60"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}