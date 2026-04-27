'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Beneficiary } from '../../types/beneficiary.types'

interface BeneficiaryFamilyRowProps {
  beneficiary: Beneficiary
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

export function BeneficiaryFamilyRow({
                                       beneficiary,
                                     }: BeneficiaryFamilyRowProps) {
  const members = beneficiary.familyMembers

  return (
    <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">
            Family Members
          </h3>
          <p className="text-sm text-muted-foreground">
            {beneficiary.fullName} · {beneficiary.policyNumber}
          </p>
        </div>

        <Badge variant="secondary">
          {members.length} member{members.length === 1 ? '' : 's'}
        </Badge>
      </div>

      {members.length === 0 ? (
        <div className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
          No family members added for this beneficiary.
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Coverage</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    {member.fullName}
                  </TableCell>
                  <TableCell>{member.relationship}</TableCell>
                  <TableCell>{member.gender}</TableCell>
                  <TableCell>{formatDate(member.dateOfBirth)}</TableCell>
                  <TableCell>
                    {member.isCovered ? (
                      <Badge variant="success">Covered</Badge>
                    ) : (
                      <Badge variant="secondary">Not Covered</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}