import { fetchUsers } from "@/services/api"

export async function generateStaticParams() {
  try {
    const users = await fetchUsers()
    return users.map((user) => ({
      id: user.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Provide fallback IDs 1-20 in case of API failure
    return Array.from({ length: 20 }, (_, i) => ({
      id: (i + 1).toString(),
    }))
  }
}

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 