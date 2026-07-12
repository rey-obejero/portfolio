import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default function (eleventyConfig) {
  eleventyConfig.ignores.add('.agents');
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./src/index.css');
    const tailwindOutputPath = './_site/index.css';
    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
    const outputDir = path.dirname(tailwindOutputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await postcss([tailwindcss()]).process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  eleventyConfig.addPassthroughCopy('./src/assets/svg');

  return {
    dir: {
      input: 'src',
    },
  };
}
