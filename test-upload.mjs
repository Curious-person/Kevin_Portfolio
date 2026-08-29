import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpload() {
  console.log("Attempting insert...");
  const { data, error } = await supabase
    .from("designs")
    .insert({
      title: "Test Design",
      image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      width: 864,
      height: 576
    })
    .select("id, title, image, width, height, aspect_ratio, created_at, updated_at")
    .single();

  if (error) {
    console.error("Supabase error:", error);
  } else {
    console.log("Success:", data);
  }
}

testUpload();
