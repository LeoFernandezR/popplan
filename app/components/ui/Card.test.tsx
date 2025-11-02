import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies hover styles when hover prop is true', () => {
    render(
      <Card hover>
        <p>Hoverable card</p>
      </Card>
    )
    const card = screen.getByText('Hoverable card').parentElement
    expect(card).toHaveClass('hover:shadow-md', 'cursor-pointer')
  })

  it('does not apply hover styles when hover prop is false', () => {
    render(
      <Card hover={false}>
        <p>Non-hoverable card</p>
      </Card>
    )
    const card = screen.getByText('Non-hoverable card').parentElement
    expect(card).not.toHaveClass('cursor-pointer')
  })

  it('applies custom className', () => {
    render(
      <Card className="custom-class">
        <p>Custom card</p>
      </Card>
    )
    const card = screen.getByText('Custom card').parentElement
    expect(card).toHaveClass('custom-class')
  })
})

