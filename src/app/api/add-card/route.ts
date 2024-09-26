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

  const title = data.get("CardTitle") as string;
  const baseCost = data.get("CostOfCard") ;
  const basePPH = data.get("ProfitPerHour") as string;
  const category = data.get("category") as string;
  const requiredCardId = data.get("requiredCardId") as string;
  const requiredCardLevel = data.get("requiredCardLevel") as string;
  const requiredCardTitle = data.get("requiredCardTitle") as string;
  


  if (!title || !baseCost || !basePPH || !category) {
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
    const existingTask = await prisma2.card.findFirst({
      where: { title },
    });
    if (existingTask) {
      return new Response(JSON.stringify({ error: 'A task with the same name and category already exists.' }), { status: 409 });
    }

    // Create a new task in the database
    const task = await prisma2.card.create({
      data: {
        title,
        category,
        baseCost : Number(baseCost),
        image : result.url,
        basePPH : Number(basePPH),
        requiredCardId,
        requiredCardTitle,
        requiredCardLevel : Number(requiredCardLevel),
      },
    });

    return new Response(JSON.stringify({ message: `Task '${task.title}' added successfully with ID: ${task.id}` }), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({
     error : (error as Error).message , 
      success: false,
    }), { status: 500 });
  }
}
