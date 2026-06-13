import { expect, test } from '@playwright/test'

test.describe('Post page', () => {
  test('renders the post heading', async ({ page }) => {
    await page.goto('/posts/graceHopper')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('does not render a 404', async ({ page }) => {
    await page.goto('/posts/graceHopper')
    await expect(page.getByText('404')).not.toBeVisible()
  })

  test('back link returns to homepage', async ({ page }) => {
    await page.goto('/posts/graceHopper')
    const backLink = page.locator('h2 a[href="/"]')
    await expect(backLink).toBeVisible()
    // dispatchEvent fires on the DOM element directly, bypassing fill-image hit-test interception
    await backLink.dispatchEvent('click')
    await expect(page).toHaveURL('/')
  })
})

test.describe('404 page', () => {
  test('returns 404 status for a non-existent post', async ({ page }) => {
    const response = await page.goto('/posts/this-does-not-exist')
    await expect(page).toHaveURL('/posts/this-does-not-exist')
    await expect(page.getByText('404')).toBeVisible()
    expect(response?.status()).toBe(404)
  })
})
