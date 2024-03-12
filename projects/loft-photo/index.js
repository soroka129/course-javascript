import pages from './pages';
import getRandomElement from './model';
import mainPage from './mainPage';
import loginPage from './loginPage';

import('./styles.css');

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();

const pageNames = ['login', 'main', 'profile'];

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }
    const index = Math.round(Math.random() * (array.length - 1));
    return array[index];
  },

  //  getNextPhoto() {
  //     const friends=this.getRandomElement(friendsDB);
  //     const photos = photosDB[friend.id];
  //     const photo = this.getRandomElement(photos);
  //     return {friend, url: photo.url};
  // },
};

document.addEventListener('click', () => {
  const pageName = getRandomElement(pageNames);
  pages.openPage(pageName);
});
