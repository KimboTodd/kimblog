import { expect, test } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the blog title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'kimblog', level: 1 }),
    ).toBeVisible()
  })

  test('renders at least one post preview heading', async ({ page }) => {
    // Post previews use h3, not article elements
    await expect(page.getByRole('heading', { level: 3 }).first()).toBeVisible()
  })

  test('clicking a post preview navigates to the post page', async ({
    page,
  }) => {
    await page
      .getByRole('heading', { name: 'Creating a Chrome Extension' })
      .getByRole('link')
      .dispatchEvent('click')
    await expect(page).toHaveURL(/\/posts\/chromeExtension/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
