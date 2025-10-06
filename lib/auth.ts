import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hashPassword(password)
  
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

export async function loginUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  
  if (!user) {
    throw new Error('User not found')
  }
  
  const isValidPassword = await verifyPassword(password, user.password)
  
  if (!isValidPassword) {
    throw new Error('Invalid password')
  }
  
  return user
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value
  
  if (!userId) {
    return null
  }
  
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
    },
  })
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('userId')
  redirect('/')
}
