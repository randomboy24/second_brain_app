import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { link, title, type } = body;
  if (!link || !title) {
    return NextResponse.json(
      {
        error: "BAD REQUEST",
        message:
          "The provided input is invalid. Please check the data and try again.",
      },
      {
        status: 400,
      }
    );
  }
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const id = session.user.id;
  console.log(id);

  try {
    const content = await prisma.content.create({
      data: {
        userId: id,
        title,
        link,
        type,
      },
    });
    return NextResponse.json({ content });
  } catch (err) {
    console.log("Something went wrong");
    return NextResponse.json(
      { message: "Invalid Input" },
      {
        status: 400,
      }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();
  //@ts-ignore
  const id = session?.user.id;
  try {
    const contents = await prisma.content.findMany({
      where: {
        userId: id,
      },
      select: {
        title: true,
        id: true,
        link: true,
        type: true,
      },
    });
    return NextResponse.json({
      contents,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "invalid inputs",
      },
      {
        status: 400,
      }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const id = body.id;
  if (!id) {
    return NextResponse.json(
      {
        message: "Invalid input",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const content = await prisma.content.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      content,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "invalid input",
      },
      {
        status: 400,
      }
    );
  }
};
