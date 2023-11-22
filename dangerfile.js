const { danger } = require('danger');

danger.git.modifiedFiles.forEach(file => {
  console.log(`Modified file: ${file}`);
});

danger.git.addedFiles.forEach(file => {
  console.log(`Added file: ${file}`);
});
