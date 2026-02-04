import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserService } from './user-service'
import { db } from '@/db'

// We rely on the mock from setup.ts, but we need to refine it here if needed
// or just use vi.mocked

describe('UserService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('findByIdentifier', () => {
        it('should find a user by username or email', async () => {
            const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' }

            // Mocking the chain: db.select().from().where().limit()
            const mockLimit = vi.fn().mockResolvedValue([mockUser])
            const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit })
            const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })

            // @ts-ignore
            vi.mocked(db.select).mockReturnValue({ from: mockFrom })

            const user = await UserService.findByIdentifier('testuser')

            expect(db.select).toHaveBeenCalled()
            expect(user).toEqual(mockUser)
        })
    })

    describe('isUsernameTaken', () => {
        it('should return true if username exists', async () => {
            const mockLimit = vi.fn().mockResolvedValue([{ id: '1' }])
            const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit })
            const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })

            // @ts-ignore
            vi.mocked(db.select).mockReturnValue({ from: mockFrom })

            const taken = await UserService.isUsernameTaken('taken_user')
            expect(taken).toBe(true)
        })

        it('should return false if username does not exist', async () => {
            const mockLimit = vi.fn().mockResolvedValue([])
            const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit })
            const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })

            // @ts-ignore
            vi.mocked(db.select).mockReturnValue({ from: mockFrom })

            const taken = await UserService.isUsernameTaken('free_user')
            expect(taken).toBe(false)
        })
    })
})
