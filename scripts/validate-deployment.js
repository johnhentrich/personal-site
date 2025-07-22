#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔍 Validating deployment data...')

// Check if projects.json exists and is valid
const projectsPath = path.join(__dirname, '../data/projects.json')
if (!fs.existsSync(projectsPath)) {
  console.error('❌ projects.json not found')
  process.exit(1)
}

let projectsData
try {
  projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'))
} catch (error) {
  console.error('❌ Invalid JSON in projects.json:', error.message)
  process.exit(1)
}

// Validate no duplicate IDs
const projectIds = projectsData.other.map(project => project.id)
const uniqueIds = [...new Set(projectIds)]
if (projectIds.length !== uniqueIds.length) {
  console.error('❌ Duplicate project IDs found')
  const duplicates = projectIds.filter((id, index) => projectIds.indexOf(id) !== index)
  console.error('Duplicates:', duplicates)
  process.exit(1)
}

// Validate no duplicate titles
const projectTitles = projectsData.other.map(project => project.title)
const uniqueTitles = [...new Set(projectTitles)]
if (projectTitles.length !== uniqueTitles.length) {
  console.error('❌ Duplicate project titles found')
  const duplicates = projectTitles.filter((title, index) => projectTitles.indexOf(title) !== index)
  console.error('Duplicates:', duplicates)
  process.exit(1)
}

// Check for exactly one Texas Hold'em project
const texasHoldemProjects = projectsData.other.filter(project => 
  project.title.toLowerCase().includes('texas hold') ||
  project.title.toLowerCase().includes('poker') ||
  project.id.includes('texas') ||
  project.id.includes('holdem') ||
  project.id.includes('poker')
)

if (texasHoldemProjects.length !== 1) {
  console.error(`❌ Expected exactly 1 Texas Hold'em project, found ${texasHoldemProjects.length}`)
  console.error('Projects found:', texasHoldemProjects.map(p => p.title))
  process.exit(1)
}

// Check build output exists
const outPath = path.join(__dirname, '../out')
if (!fs.existsSync(outPath)) {
  console.error('❌ Build output directory not found. Run npm run build first.')
  process.exit(1)
}

// Check projects page was built
const projectsHtmlPath = path.join(outPath, 'projects/index.html')
if (!fs.existsSync(projectsHtmlPath)) {
  console.error('❌ Projects page not found in build output')
  process.exit(1)
}

// Count Texas Hold'em mentions in built HTML (accounting for HTML entities)
const htmlContent = fs.readFileSync(projectsHtmlPath, 'utf8')
const texasMatches = (htmlContent.match(/Texas Hold[&#x27;']?em/gi) || []).length

if (texasMatches !== 1) {
  console.error(`❌ Expected exactly 1 Texas Hold'em mention in HTML, found ${texasMatches}`)
  console.error('Matches found:', htmlContent.match(/Texas Hold[&#x27;']?em/gi))
  process.exit(1)
}

console.log('✅ All deployment validations passed')
console.log(`✅ Found 1 Texas Hold'em project: ${texasHoldemProjects[0].title}`)
console.log(`✅ Total projects: ${projectsData.other.length}`)
console.log(`✅ Build output validated`)