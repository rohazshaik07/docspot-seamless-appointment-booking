import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()

    if (!["approved", "cancelled"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    // In a real app, update the database
    console.log(`Doctor ${params.id} status updated to: ${status}`)

    return NextResponse.json({
      message: `Doctor ${status} successfully`,
    })
  } catch (error) {
    console.error("Approve doctor error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
