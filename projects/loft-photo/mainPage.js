import pages from './pages';
import model from './model';
import profilePage from './profilePage';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const photoCamp = document.querySelector('.component-photo');
    const headerPhotoCamp = document.querySelector('.component-header-photo');
    const headerNameCamp = document.querySelector('.component-header-name');
    const footerPhotoCamp = document.querySelector('.component-footer-photo');

    this.friend = friend;

    headerPhotoCamp.style.backgrounImage = `url('${friend.photo_50}')`;
    headerNameCamp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoCamp.style.backgrounImage = `url(${url})`;
    footerPhotoCamp.style.backgrounImage = `url('${model.me.photo_50}')`;
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

    document
      .querySelector('.component-header-profile-link')
      .addEventListener('click', async () => {
        await profilePage.setUser(this.friend);
        pages.openPage('profile');
      });

    document
      .querySelector('.component-footer-container-profile-link')
      .addEventListener('click', async () => {
        await profilePage.setUser(model.me);
        pages.openPage('profile');
      });
  },

  logout() {},

  getFriends() {},

  getUsers(ids) {},
};
