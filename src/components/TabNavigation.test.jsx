import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TabNavigation from './TabNavigation'

describe('TabNavigation', () => {
  const tabs = {
    DICTIONARY: 'dictionary',
    SHOPPING: 'shopping',
    WORDS: 'words',
  }

  it('should render all tabs', () => {
    render(
      <TabNavigation
        activeTab="dictionary"
        onTabChange={vi.fn()}
        tabs={tabs}
      />
    )

    expect(screen.getByText('Dictionary')).toBeInTheDocument()
    expect(screen.getByText('Shopping Calculator')).toBeInTheDocument()
    expect(screen.getByText('Word Concatenation')).toBeInTheDocument()
  })

  it('should highlight active tab', () => {
    render(
      <TabNavigation
        activeTab="dictionary"
        onTabChange={vi.fn()}
        tabs={tabs}
      />
    )

    const dictionaryTab = screen.getByText('Dictionary').closest('button')
    expect(dictionaryTab).toHaveClass('bg-blue-600', 'text-white')
  })

  it('should not highlight inactive tabs', () => {
    render(
      <TabNavigation
        activeTab="dictionary"
        onTabChange={vi.fn()}
        tabs={tabs}
      />
    )

    const shoppingTab = screen.getByText('Shopping Calculator').closest('button')
    expect(shoppingTab).not.toHaveClass('bg-blue-600')
  })

  it('should call onTabChange when tab is clicked', async () => {
    const user = userEvent.setup()
    const onTabChange = vi.fn()

    render(
      <TabNavigation
        activeTab="dictionary"
        onTabChange={onTabChange}
        tabs={tabs}
      />
    )

    await user.click(screen.getByText('Shopping Calculator'))
    expect(onTabChange).toHaveBeenCalledWith('shopping')
  })

  it('should set aria-current for active tab', () => {
    render(
      <TabNavigation
        activeTab="dictionary"
        onTabChange={vi.fn()}
        tabs={tabs}
      />
    )

    const dictionaryTab = screen.getByText('Dictionary').closest('button')
    expect(dictionaryTab).toHaveAttribute('aria-current', 'page')
  })

  it('should not set aria-current for inactive tabs', () => {
    render(
      <TabNavigation
        activeTab="dictionary"
        onTabChange={vi.fn()}
        tabs={tabs}
      />
    )

    const shoppingTab = screen.getByText('Shopping Calculator').closest('button')
    expect(shoppingTab).not.toHaveAttribute('aria-current')
  })
})

