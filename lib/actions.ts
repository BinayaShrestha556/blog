'use server'

import { loginUser, createUser, getCurrentUser } from './auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const user = await loginUser(email, password)
    
    // Set user ID in cookie
    const cookieStore = await cookies()
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    redirect('/')
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Login failed'
    }
  }
}

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  try {
    const user = await createUser(email, password, name)
    
    // Set user ID in cookie
    const cookieStore = await cookies()
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    redirect('/')
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Registration failed'
    }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('userId')
  redirect('/')
}

export async function getCurrentUserAction() {
  return await getCurrentUser()
}
