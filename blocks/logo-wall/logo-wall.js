import createTag from '../../utils/tag.js';
import { addInViewAnimationToMultipleElements } from '../../utils/helpers.js';

const animationConfig = {
  staggerTime: 0.4,
  items: [
    {
      selector: '.logo-wall-title',
      animatedClass: 'slide-reveal-up',
    },
    {
      selectors: '.logo-wall-list-item',
      animatedClass: 'fade-up',
      staggerTime: '0.15',
    }],
};

export default function decorate(block) {
  block.classList.add('contained');

  const logoWallList = document.createElement('ul');
  logoWallList.setAttribute('class', 'logo-wall-list');

  [...block.children].forEach((row) => {
    [...row.children].forEach((div) => {
      const title = div.querySelector('h1,h2,h3,h4,h5,h6');
      const picture = div.querySelector('picture');

      if (title) {
        title.setAttribute('class', 'logo-wall-title');
        row.replaceWith(title);
      } else if (picture) {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'logo-wall-list-item');

        const linkEl = div.querySelector('a');
        if (linkEl) {
          const pictureLink = createTag('a', {
            href: linkEl.href,
            title: linkEl.title,
            target: '_blank',
            class: 'logo-wall-item-link',
            'aria-label': linkEl.textContent,
          }, picture);

          listItem.append(pictureLink);
        } else {
          listItem.append(picture);
        }

        logoWallList.append(listItem);
        row.remove();
      }
    });
  });
  block.append(logoWallList);

  if (block.classList.contains('inview-animation')) {
    addInViewAnimationToMultipleElements(animationConfig.items, block, animationConfig.staggerTime);
  }
}
