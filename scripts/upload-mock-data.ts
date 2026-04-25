import dotenv from "dotenv"
import fs from "fs"
import { createClient } from "@supabase/supabase-js"
dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  throw new Error("Missing Supabase env variables")
}

const supabase = createClient(supabaseUrl, serviceKey)

const json = JSON.parse(fs.readFileSync("./mock/beneficiaries.json", "utf-8"))

const beneficiariesSource = json.beneficiaries

async function seed() {
  const beneficiaries = beneficiariesSource.map((b: any) => ({
    id: b.id,
    full_name: b.fullName,
    email: b.email,
    nationality: b.nationality,
    policy_number: b.policyNumber,
    company: b.company,
    plan: b.plan,
    coverage_status: b.coverageStatus,
    start_date: b.startDate,
    end_date: b.endDate,
    monthly_premium: b.payment.monthlyPremium,
    outstanding_amount: b.payment.outstandingAmount,
    last_payment_date: b.payment.lastPaymentDate,
    payment_status: b.payment.paymentStatus,
  }))

  const familyMembers = beneficiariesSource.flatMap((b: any) =>
    b.familyMembers.map((member: any) => ({
      id: member.id,
      beneficiary_id: b.id,
      full_name: member.fullName,
      relationship: member.relationship,
      gender: member.gender,
      date_of_birth: member.dateOfBirth,
      is_covered: member.isCovered,
    }))
  )

  await supabase.from("family_members").delete().neq("id", "")
  await supabase.from("beneficiaries").delete().neq("id", "")

  const { error: beneficiariesError } = await supabase
    .from("beneficiaries")
    .insert(beneficiaries)

  if (beneficiariesError) throw beneficiariesError

  const { error: familyError } = await supabase
    .from("family_members")
    .insert(familyMembers)

  if (familyError) throw familyError

  console.log("✅ Seed completed")
  console.log(`✅ Inserted ${beneficiaries.length} beneficiaries`)
  console.log(`✅ Inserted ${familyMembers.length} family members`)
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error)
  process.exit(1)
})
