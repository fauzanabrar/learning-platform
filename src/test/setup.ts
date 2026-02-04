import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock next-auth
vi.mock('next-auth', () => ({
    default: vi.fn(() => ({
        auth: vi.fn(),
        signIn: vi.fn(),
        signOut: vi.fn(),
        handlers: { GET: vi.fn(), POST: vi.fn() },
    })),
}))

vi.mock('next-auth/providers/credentials', () => ({
    default: vi.fn(),
}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => '/',
    redirect: vi.fn((url) => {
        // Logic for Next.js redirect
        const error = new Error(`NEXT_REDIRECT;${url}`);
        (error as any).digest = `NEXT_REDIRECT;${url}`;
        throw error;
    }),
}))

// Mock our auth module
vi.mock('@/auth', () => ({
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
}))

// Global DB Mock
vi.mock('@/db', () => ({
    db: {
        select: vi.fn(() => ({
            from: vi.fn(() => ({
                where: vi.fn(() => ({
                    limit: vi.fn(() => []),
                })),
            })),
        })),
        insert: vi.fn(() => ({
            values: vi.fn(() => ({
                returning: vi.fn(() => []),
            })),
        })),
    },
}))
