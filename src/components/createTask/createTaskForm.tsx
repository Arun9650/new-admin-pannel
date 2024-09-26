"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "../ui/card";
import Confetti from "react-confetti";
import { Loader2 } from "lucide-react";

import axios from "axios";
import { Input } from "../ui/input";
import { useState } from "react";

const formSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }).min(1, { message: "Please select a category." }),
  points: z.coerce.number({
    required_error: "points is required",
    invalid_type_error: "points must be a positive number",
  }).positive(),
  link: z
    .string({
      required_error: "Please enter a link.",
    })
    .url({
      message: "Please enter a valid URL.",
    }),
  image: z
    .instanceof(File)
    .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
      message: "Only .jpg, .png, and .gif formats are supported.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TaskForm() {
  const { toast } = useToast()

  const [showConfetti, setShowConfetti] = useState(false); // State to manage confetti
  const [isLoading, setIsLoading] = useState(false);
  // console.log("🚀 ~ AddCardForm ~ cards:", cards)



  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      category: "",
      points: 0,
      link: "",
      image: undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    const formData = new FormData();
   // Append form values
   formData.append("taskName", values.taskName);
   formData.append("category", values.category);
   formData.append("points", values.points.toString());

   // Append the link if provided
   if (values.link) {
     formData.append("link", values.link);
   }

   // Append the file (image)
   if (values.image) {
     formData.append("image", values.image as File);
   } else {
     alert("Image is required.");
     return;
   }

   console.log(formData);
   console.log(values);
    const apiEndpoint = "https://new-admin-pannel-rho.vercel.app/api/create-task";

    await axios
      .post(apiEndpoint, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Show confetti for 3 seconds, then display the alert
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setTimeout(() => {
            toast({
              className: 'bg-primary text-white',
              title:'Congratulations!',
              description: "Task created successfully!",
              duration:2000
            })
          }, 100); // Slight delay to ensure confetti finishes smoothly
        }, 3000); // Confetti will be shown for 3 seconds
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          duration: 2000,
        })
      });
      setIsLoading(false);
  }

  return (
    <Card className="p-6 rounded-xl">
            {showConfetti && <Confetti  recycle={false} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter task name"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <Input
                  datatype="number"
                    type="number"
                    {...field}
                    className="input"
                    onFocus={(e) => {
                      if (e.target.value === '0') {
                        e.target.value = '';
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        e.target.value = '0';
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, ref,  } }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  {/* Use a regular input for file upload */}
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    ref={ref}
                    className="file-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <Button type="submit" disabled={isLoading} className="w-40"> {isLoading ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />): "Add Task"} </Button>
        </form>
      </Form>
    </Card>
  );
}
