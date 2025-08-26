import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Define the validation schema to match the form schema
const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interest: z.string().min(10, "Please tell us more about your interest (minimum 10 characters)"),
  experience: z.string().optional(),
  newsletter: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = applicationSchema.parse(body)
    
    // Create the application in the database
    const application = await prisma.application.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        interest: validatedData.interest,
        experience: validatedData.experience || null,
        newsletter: validatedData.newsletter,
      },
    })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        id: application.id
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Error creating application:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.issues
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}