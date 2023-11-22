const { danger } = require('danger');

danger.lintFiles(['*.ts', '*.html', '*.css']);

danger.failOnErrors();

const testCoverageThreshold = 80;
const filesWithLowCoverage = danger.git.modifiedFiles.filter(file => {
  const coverage = getCoverageForFile(file);
  return coverage < testCoverageThreshold;
});

if (filesWithLowCoverage.length > 0) {
  danger.fail(`Coverage below ${testCoverageThreshold}% for files: ${filesWithLowCoverage.join(', ')}`);
}
