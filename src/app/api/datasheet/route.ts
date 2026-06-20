import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || !url.startsWith("https://www.keylightspain.eu/")) {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  const res = await fetch(url);
  if (!res.ok) {
    return new NextResponse("Document not found", { status: 404 });
  }

  const buffer = await res.arrayBuffer();
  const filename = url.split("/").pop() ?? "datasheet.pdf";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
