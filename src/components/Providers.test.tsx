import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Providers } from './Providers'
import { toast } from 'sonner'

// Mock toast isn't strictly needed for the initial render test
// but we keep it if we decide to add more complex interactions

describe('Providers Component', () => {
    it('renders provider list correctly', () => {
        render(<Providers />)
        expect(screen.getByText('Model Providers')).toBeInTheDocument()
        expect(screen.getByText('OpenAI')).toBeInTheDocument()
        expect(screen.getByText('Anthropic')).toBeInTheDocument()
    })

    it('toggles password visibility when eye icon is clicked', () => {
        render(<Providers />)

        // Find input for OpenAI (which is enabled by default)
        const input = screen.getAllByPlaceholderText('sk-...')[0]
        expect(input).toHaveAttribute('type', 'password')

        // Find the toggle button (it's the first button with icon inside)
        const toggleButtons = screen.getAllByRole('button')
        fireEvent.click(toggleButtons[0]) // First eye icon button

        expect(input).toHaveAttribute('type', 'text')
    })
})
