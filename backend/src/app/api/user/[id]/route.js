import corsHeaders from "@/lib/cors";
import { getClientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export async function OPTIONS(req) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// GET single user by ID
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");
    const result = await db
      .collection("user")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { password: 0 } }
      );

    if (!result) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    console.log("==> result", result);
    return NextResponse.json(result, {
      headers: corsHeaders,
    });
  } catch (exception) {
    console.log("exception", exception.toString());
    return NextResponse.json(
      { message: exception.toString() },
      { status: 400, headers: corsHeaders }
    );
  }
}

// PATCH update user
export async function PATCH(req, { params }) {
  const { id } = await params;
  const data = await req.json();
  const partialUpdate = {};

  console.log("data : ", data);

  if (data.username != null) partialUpdate.username = data.username;
  if (data.email != null) partialUpdate.email = data.email;
  if (data.password != null) {
    partialUpdate.password = await bcrypt.hash(data.password, 10);
  }
  if (data.firstname != null) partialUpdate.firstname = data.firstname;
  if (data.lastname != null) partialUpdate.lastname = data.lastname;
  if (data.status != null) partialUpdate.status = data.status;

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");

    const existedData = await db
      .collection("user")
      .findOne({ _id: new ObjectId(id) });

    if (!existedData) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const updateData = { ...existedData, ...partialUpdate };
    const updatedResult = await db
      .collection("user")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json(updatedResult, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (exception) {
    console.log("exception", exception.toString());
    const errorMsg = exception.toString();
    let displayErrorMsg = "";

    if (errorMsg.includes("duplicate")) {
      if (errorMsg.includes("username")) {
        displayErrorMsg = "Duplicate Username!!";
      } else if (errorMsg.includes("email")) {
        displayErrorMsg = "Duplicate Email!!";
      }
    }

    return NextResponse.json(
      { message: displayErrorMsg || errorMsg },
      { status: 400, headers: corsHeaders }
    );
  }
}

// PUT replace entire user
export async function PUT(req, { params }) {
  const { id } = await params;
  const data = await req.json();

  if (!data.username || !data.email) {
    return NextResponse.json(
      { message: "Missing mandatory data" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedResult = await db
      .collection("user")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });

    if (updatedResult.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(updatedResult, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (exception) {
    console.log("exception", exception.toString());
    const errorMsg = exception.toString();
    let displayErrorMsg = "";

    if (errorMsg.includes("duplicate")) {
      if (errorMsg.includes("username")) {
        displayErrorMsg = "Duplicate Username!!";
      } else if (errorMsg.includes("email")) {
        displayErrorMsg = "Duplicate Email!!";
      }
    }

    return NextResponse.json(
      { message: displayErrorMsg || errorMsg },
      { status: 400, headers: corsHeaders }
    );
  }
}

// DELETE user
export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");

    const result = await db
      .collection("user")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully", deletedCount: result.deletedCount },
      { status: 200, headers: corsHeaders }
    );
  } catch (exception) {
    console.log("exception", exception.toString());
    return NextResponse.json(
      { message: exception.toString() },
      { status: 400, headers: corsHeaders }
    );
  }
}
