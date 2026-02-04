import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AuthCard } from './auth-card'

describe('AuthCard', () => {
    it('renders correctly with title and description', () => {
        render(
            <AuthCard
                title="Test Title"
                description="Test Description"
                footerText="Don't have an account?"
                footerLinkText="Sign up"
                footerLinkHref="/register"
            >
                <div>Test Children</div>
            </AuthCard>
        )

        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
        expect(screen.getByText('Test Children')).toBeInTheDocument()
        expect(screen.getByText('Sign up')).toHaveAttribute('href', '/register')
    })
})
