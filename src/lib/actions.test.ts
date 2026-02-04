import { describe, it, expect, vi, beforeEach } from 'vitest'
import { register, authenticate, logout } from './actions'
import { UserService } from './user-service'
import { signIn, signOut } from '@/auth'
import { redirect } from 'next/navigation'

// Mocking dependencies
vi.mock('./user-service', () => ({
    UserService: {
        isUsernameTaken: vi.fn(),
        isEmailTaken: vi.fn(),
        createUser: vi.fn(),
    },
}))

vi.mock('@/auth', () => ({
    signIn: vi.fn(),
    signOut: vi.fn(),
}))

vi.mock('next/navigation', () => ({
    redirect: vi.fn(),
}))

describe('Auth Actions', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const formData = new FormData()
            formData.append('name', 'Test User')
            formData.append('username', 'testuser')
            formData.append('password', 'password123')
            formData.append('email', 'test@example.com')

            // @ts-ignore
            UserService.isUsernameTaken.mockResolvedValue(false)
            // @ts-ignore
            UserService.isEmailTaken.mockResolvedValue(false)
            // @ts-ignore
            UserService.createUser.mockResolvedValue({ id: '1', name: 'Test User' })

            const result = await register(formData)
            expect(result).toEqual({ success: true })
            expect(UserService.createUser).toHaveBeenCalled()
        })

        it('should fail if username is taken', async () => {
            const formData = new FormData()
            formData.append('name', 'Test User')
            formData.append('username', 'taken')
            formData.append('password', 'password123')

            // @ts-ignore
            UserService.isUsernameTaken.mockResolvedValue(true)

            const result = await register(formData)
            expect(result.error).toContain('taken')
        })
    })

    describe('logout', () => {
        it('should call signOut and redirect', async () => {
            await logout()
            expect(signOut).toHaveBeenCalledWith({ redirect: false })
            expect(redirect).toHaveBeenCalledWith('/login')
        })
    })
})
