import { test, expect } from '@playwright/test';

test('create employee using ui', async ({ page }) => {
  await page.goto('/employees');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByLabel('Name').fill('John Smith');
  await page.getByLabel('Email').fill('john@company.com');
  await page.getByLabel('Department').fill('Engineering');
  await page.getByLabel('Role').fill('QA Engineer');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('John Smith')).toBeVisible();
});
