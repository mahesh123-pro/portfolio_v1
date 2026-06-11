import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, role, message } = body;

    // Validate request body
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields in payload coordinates." },
        { status: 400 }
      );
    }

    console.log("Transmission received at API endpoint:", body);

    // 1. Supabase insert if keys exist
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    let dbSuccess = false;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase
          .from("contacts")
          .insert([{ name, email, subject, role, message, created_at: new Date().toISOString() }]);
        
        if (error) throw error;
        dbSuccess = true;
        console.log("Supabase insertion successful.");
      } catch (dbErr: any) {
        console.error("Supabase Database failed:", dbErr.message);
      }
    } else {
      console.warn("SUPABASE_URL/ANON_KEY not configured. Skipping DB node storage.");
    }

    // 2. Resend email dispatch if key exists
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSuccess = false;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Portfolio Admin <onboarding@resend.dev>",
          to: "mahesh.bakki@example.com", // Developer destination email
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h3>New Portfolio Connection Log</h3>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Return Email:</strong> ${email}</p>
            <p><strong>Sender Category:</strong> ${role}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message Log:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          `,
        });
        emailSuccess = true;
        console.log("Resend notification dispatch successful.");
      } catch (emailErr: any) {
        console.error("Resend service failed:", emailErr.message);
      }
    } else {
      console.warn("RESEND_API_KEY not configured. Skipping email dispatch.");
    }

    return NextResponse.json({
      message: "Transmission received successfully.",
      dbSynced: dbSuccess,
      emailSent: emailSuccess,
    });
  } catch (err: any) {
    console.error("Global API transmission failure:", err);
    return NextResponse.json(
      { error: "Internal Server Error during data routing." },
      { status: 500 }
    );
  }
}
