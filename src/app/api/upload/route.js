import { NextResponse } from "next/server";
// import {writeFile} from 'fs/promises';
// import path from "path";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dtgxrnxer', 
  api_key: '879335523621296', 
  api_secret: 'tzVTq0i_ZmTAo4-rXP4h9xNvHSw' 
});

export async function POST(request){
    const data = await request.formData();
    console.log(data.get("file"));
    const file = data.get("file");

    if(!file){
        return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Savve buffer to file system
    // const filePath = path.join(process.cwd(), "public", file.name);
    // await writeFile(filePath, buffer);

    // Upload to cloudinary
   const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, (error, result) => {
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
    }).end(buffer);
    });
    
    return NextResponse.json({ message: "File uploaded", url: result.secure_url});
}