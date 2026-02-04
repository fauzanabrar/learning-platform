import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Router } from './Router'

describe('Router Component', () => {
    it('renders correctly', () => {
        render(<Router />)
        expect(screen.getByText('Routing Rules')).toBeInTheDocument()
        expect(screen.getByText('Dispatch requests to specific models')).toBeInTheDocument()
    })

    it('renders routing rules from data', () => {
        render(<Router />)
        expect(screen.getByText('^code.*')).toBeInTheDocument()
        expect(screen.getByText('claude-3-5-sonnet')).toBeInTheDocument()
    })
})
