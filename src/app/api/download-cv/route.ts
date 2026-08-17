import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get("type");

    let cloudinaryUrl: string | undefined;
    let filename: string;

    if (type === "en") {
      cloudinaryUrl = process.env.CV_EN_URL;
      filename = "CV-ILHAM-RAMADHANA-HARTONO-EN.pdf";
    } else if (type === "id") {
      cloudinaryUrl = process.env.CV_ID_URL;
      filename = "CV-ILHAM-RAMADHANA-HARTONO-IN.pdf";
    } else {
      return NextResponse.json(
        {
          error: "Tipe CV tidak valid.",
        },
        {
          status: 400,
        },
      );
    }

    if (!cloudinaryUrl) {
      return NextResponse.json(
        {
          error: "URL CV belum dikonfigurasi.",
        },
        {
          status: 404,
        },
      );
    }

    const response = await fetch(cloudinaryUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Cloudinary response:",
        response.status,
        response.statusText,
      );

      return NextResponse.json(
        {
          error: "Gagal mengambil CV dari Cloudinary.",
        },
        {
          status: 502,
        },
      );
    }

    const contentType =
      response.headers.get("content-type") || "application/pdf";

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(arrayBuffer.byteLength),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Download CV error:", error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan saat download CV.",
      },
      {
        status: 500,
      },
    );
  }
}
