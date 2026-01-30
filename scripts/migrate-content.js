import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read YAML file
const yamlPath = join(__dirname, '..', '_data', 'data.yml');
const yamlData = fs.readFileSync(yamlPath, 'utf8');
const data = yaml.load(yamlData);

// Transform to new structure
const resumeData = {
  profile: {
    name: data.sidebar.name,
    tagline: data.sidebar.tagline,
    avatar: '/profile.jpg',
    email: data.sidebar.email,
    linkedin: data.sidebar.linkedin,
    github: data.sidebar.github,
    twitter: data.sidebar.twitter,
  },
  summary: data['career-profile'].summary.trim(),
  experience: data.experiences.info.map(exp => ({
    role: exp.role,
    company: exp.company,
    period: exp.time,
    details: exp.details.trim(),
    highlights: exp.details
      .trim()
      .split('\n')
      .filter(line => line.trim().startsWith('★') || line.trim().startsWith('-'))
      .map(line => line.trim().replace(/^[★-]\s*/, '').replace(/^\*\*/, '').replace(/\*\*/, ''))
  })),
  skills: data.skills.toolset.map(s => s.name.replace(/^●\s*/, '').trim()),
  books: data.books.papers.map(b => ({
    title: b.title,
    authors: b.authors,
    link: b.link
  })),
  openSource: data.oss.contributions.map(c => ({
    title: c.title,
    link: c.link,
    description: c.tagline
  })),
  speaking: data.talks.presentations.map(t => ({
    title: t.title,
    link: t.link
  })),
  trainings: data.trainings.sessions.map(t => ({
    title: t.title,
    link: t.link || ''
  })),
  certifications: data.certifications.list.map(c => ({
    name: c.name,
    year: c.start.toString(),
    description: c.details.trim()
  })),
  education: {
    degree: data.education.info[0].degree,
    institution: data.education.info[0].university,
    period: data.education.info[0].time
  }
};

// Write to JSON
const outputPath = join(__dirname, '..', 'src', 'data', 'resume.json');
fs.writeFileSync(outputPath, JSON.stringify(resumeData, null, 2));

console.log('✅ Migration complete!');
console.log(`📄 Output: ${outputPath}`);
console.log('\nSummary:');
console.log(`- Profile: ${resumeData.profile.name}`);
console.log(`- Work experiences: ${resumeData.experience.length}`);
console.log(`- Skills: ${resumeData.skills.length}`);
console.log(`- Books: ${resumeData.books.length}`);
console.log(`- Open source contributions: ${resumeData.openSource.length}`);
console.log(`- Public talks: ${resumeData.speaking.length}`);
console.log(`- Trainings: ${resumeData.trainings.length}`);
console.log(`- Certifications: ${resumeData.certifications.length}`);
