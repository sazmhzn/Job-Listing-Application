import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { applyJob } from "@/services/jobsApi";
import { JobData } from "@/pages/Landing/JobDetail";

interface JobFormProps {
  job: JobData | null; // Allow job to be null
}

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

const JobFormSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  resume: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      { message: "Only PDF and Word documents are allowed" }
    )
    .refine((file) => file.size <= fileSizeLimit, {
      message: "File size should not exceed 5MB",
    })
    .optional(),
  coverLetter: z.string().optional(),
  jobId: z.string(),
  jobTitle: z.string(),
});

const JobForm = ({ job }: JobFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return;

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      resume: undefined,
      coverLetter: "",
      jobId: job.id,
      jobTitle: job.title,
    },
  });

  const onSubmit = async (values: z.infer<typeof JobFormSchema>) => {
    setIsSubmitting(true);
    try {
      const applicationData = {
        ...values,
        jobId: job.id,
        jobTitle: job.title,
        resume: values.resume || new File([], "default_resume"), // Provide a default value
      };
      console.log(applicationData);

      const response = await applyJob(applicationData);
      console.log(response);
    } catch (error) {
      // Handle error, show error toast
      form.setError("root", {
        message: "Failed to submit application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="">
      <div className="p-0">
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white uppercase">
                Job Information
              </h3>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Full Name"
                          {...field}
                          className="shadow-none rounded border-[1.5px] border-stroke bg-transparent py-4 px-3 text-black outline-none focus:border-blue-600 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Email"
                          {...field}
                          className="shadow-none rounded border-[1.5px] border-stroke bg-transparent py-4 px-3 text-black outline-none focus:border-blue-600 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Enter coverLetter"
                          {...field}
                          className="w-full shadow-none rounded border-[1.5px] border-stroke bg-transparent py-4 px-3 text-black outline-none transition focus:border-blue-600 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                          rows={2} // Adjust the height
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Resume (PDF/Word)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            onChange(file);
                          }}
                          placeholder="Upload your resume"
                          {...fieldProps}
                          className="shadow-none rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none focus:border-blue-600 dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                  <div className="text-red-500 text-sm text-center">
                    {form.formState.errors.root.message}
                  </div>
                )}
                <Button type="submit" className="bg-blue-600">
                  {" "}
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobForm;
