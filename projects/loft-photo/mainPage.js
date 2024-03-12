//import pages from './pages';
import model from './model';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const photoCamp = document.querySelector('.component-photo');
    const headerPhotoCamp = document.querySelector('.component-header-photo');
    const headerNameCamp = document.querySelector('.component-header-name');

    headerPhotoCamp.style.backgrounImage = `url('${friend.photo_50}')`;
    headerNameCamp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoCamp.style.backgrounImage = `url(${url})`;
  },

  handleEvents() {
    let startForm;

    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
      e.preventDefault();
      startForm = { y: e.changedTouches[0].pageY };
    });

    document.querySelector('.component-photo').addEventListener('touchend', async (e) => {
      const direction = e.changedTouches[0].pageY - startForm;

      if (direction < e) {
        await this.getNextPhoto();
      }
    });
  },
};
