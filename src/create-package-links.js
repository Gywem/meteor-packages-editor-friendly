import fs from 'fs';

function isMeteorPackage(path) {
  return !!fs.existsSync(`${path}/package.js`);
}

const { METEOR_PACKAGE_DIRS, PWD } = process.env;
fs.readdir(METEOR_PACKAGE_DIRS, (err, files) => {
  files.forEach(file => {
    const path = `${METEOR_PACKAGE_DIRS}/${file}`;
    if (isMeteorPackage(path)) {
      const link = PWD + '/' + file;
      const shouldCreateLink = !fs.existsSync(link);
      if (shouldCreateLink) fs.symlink(path, link);
    }
  });
});
