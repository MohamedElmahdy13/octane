import { NextRequest, NextResponse } from 'next/server'
import { getBeneficiaries } from '@/features/beneficiaries/services/beneficiaries.service'

export async function GET(request: NextRequest) {
  try {
    const result = await getBeneficiaries(request.nextUrl.searchParams)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Failed to fetch beneficiaries',
      },
      { status: 500 }
    )
  }
}

