import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Documentation Tests', () => {
  const docsDir = path.join(__dirname, '..', 'docs')

  it('should have an onboarding.md file', () => {
    const onboardingPath = path.join(docsDir, 'onboarding.md')
    expect(fs.existsSync(onboardingPath)).toBe(true)
  })

  it('onboarding.md should contain necessary sections', () => {
    const onboardingPath = path.join(docsDir, 'onboarding.md')
    const content = fs.readFileSync(onboardingPath, 'utf-8')

    const requiredSections = [
      '# Developer Onboarding Guide',
      '## Project Structure Overview',
      '## Development Workflow',
      '## Code Style and Best Practices',
      '## Testing',
      '## Continuous Integration (CI) Testing',
      '## Deployment',
      '## Frequently Asked Questions',
      '## Getting Help',
      '## Useful Resources'
    ]

    requiredSections.forEach(section => {
      expect(content).toContain(section)
    })
  })

  it('should mention Vitest instead of Jest', () => {
    const onboardingPath = path.join(docsDir, 'onboarding.md')
    const content = fs.readFileSync(onboardingPath, 'utf-8')

    expect(content).toContain('Vitest')
    expect(content).not.toContain('Jest')
  })

  it('should have Docker-related information', () => {
    const onboardingPath = path.join(docsDir, 'onboarding.md')
    const content = fs.readFileSync(onboardingPath, 'utf-8')

    expect(content).toContain('Docker')
    expect(content).toContain('docker-compose run')
    expect(content).toContain('docker build')
  })

  it('should have a pr_description.md file', () => {
    const prDescriptionPath = path.join(__dirname, '..', 'pr_description.md')
    expect(fs.existsSync(prDescriptionPath)).toBe(true)
  })

  it('pr_description.md should contain updated information', () => {
    const prDescriptionPath = path.join(__dirname, '..', 'pr_description.md')
    const content = fs.readFileSync(prDescriptionPath, 'utf-8')

    expect(content).toContain('Docker')
    expect(content).toContain('Testing')
    expect(content).toContain('Vitest')
  })
})