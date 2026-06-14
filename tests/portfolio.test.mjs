import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const projectCards = [...html.matchAll(/data-project="([^"]+)"/g)].map((match) => match[1]);

assert.ok(
  html.includes('https://www.fortifyhealth.global/blog/smarter-fortification-leveraging-ai-to-detect-iron-levels-in-wheat-flour'),
  'Fortify Health case should link to the public blog post'
);

assert.ok(
  html.includes('href="https://www.fortifyhealth.global/blog/smarter-fortification-leveraging-ai-to-detect-iron-levels-in-wheat-flour"'),
  'Fortify Health blog URL should be rendered as a clickable link'
);

assert.ok(
  html.includes('Seven projects. <em>Click to read.</em>'),
  'Project section heading should reflect the expanded UNICEF cases'
);

assert.deepEqual(
  projectCards,
  ['crowd', 'quake', 'fortify', 'typhoon', 'unicefEducation', 'unicefCpd', 'unicefLaos'],
  'UNICEF work should be split into three separate project cards'
);

for (const key of ['unicefEducation', 'unicefCpd', 'unicefLaos']) {
  assert.ok(html.includes(`${key}: {`), `${key} should have its own modal content`);
}

assert.ok(
  html.includes('https://www.unicef.org/eap/protecting-children-air-pollution-open-source-air-quality-machine-learning-se-asia'),
  'Laos air quality case should link to the UNICEF article'
);

assert.ok(
  html.includes('assets/laos-air-quality-dashboard.png'),
  'Laos air quality case should reference the committed dashboard image'
);

assert.ok(
  html.includes('assets/unicef-education-kit-dashboard.jpg'),
  'Education kit case should preserve the original dashboard image'
);

assert.ok(
  html.includes('assets/unicef-cpd-analysis-tool.jpg'),
  'CPD/LLM case should preserve the original strategy-document analysis image'
);

assert.ok(
  existsSync(new URL('../assets/laos-air-quality-dashboard.png', import.meta.url)),
  'Laos dashboard image should exist in the repository'
);

assert.ok(
  existsSync(new URL('../assets/unicef-education-kit-dashboard.jpg', import.meta.url)),
  'Education kit dashboard image should exist in the repository'
);

assert.ok(
  existsSync(new URL('../assets/unicef-cpd-analysis-tool.jpg', import.meta.url)),
  'CPD analysis image should exist in the repository'
);

assert.ok(
  html.includes('I created the visualization to monitor the air quality prediction model and for communication.'),
  'Laos case should include the requested role wording'
);
