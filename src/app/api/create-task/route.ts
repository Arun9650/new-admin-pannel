import { writeFile, unlink } from "fs/promises";
import cloudinary from "cloudinary";
import { prisma2} from "@/../lib/prisma";

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const data = await req.formData();
  console.log("🚀 ~ POST ~ data:", data)
  const file = data.get("image") as File;
  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ message: "No image found or invalid file type", success: false }), { status: 400 });
  }

  const name = data.get("taskName") as string;
  const category = data.get("category") as string;
  const points = data.get("points") as string;
  const link = data.get("link") as string;
  if (!name || !category || !points || !link) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const path = `./public/temp/${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  // Save the file to the local public directory
  await writeFile(path, buffer);

  try {
    const result = await cloudinary.v2.uploader.upload(path);

    // Clean up the local file after upload
    await unlink(path);

    // Check for existing task with the same name and category
    const existingTask = await prisma2.tasks.findFirst({
      where: { name, category },
    });
    if (existingTask) {
      return new Response(JSON.stringify({ error: 'A task with the same name and category already exists.' }), { status: 409 });
    }

    // Create a new task in the database
    const task = await prisma2.tasks.create({
      data: {
        name,
        category,
        points: parseInt(points),
        icon : result.url,
        link,
      },
    });

    return new Response(JSON.stringify({ message: `Task '${task.name}' added successfully with ID: ${task.id}` }), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({
     error : (error as Error).message , 
      success: false,
    }), { status: 500 });
  }
}
