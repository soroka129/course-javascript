import pages from './pages';
import model from './model';
import profilePage from './profilePage';
import commentsTempate from './commentsTemplate.html.hbs';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    const photoStats = await model.photoStats();
    this.setFriendAndPhoto(friend, id, url, photoStats);
  },

  setFriendAndPhoto(friend, id, url, stats) {
    const photoCamp = document.querySelector('.component-photo');
    const headerPhotoCamp = document.querySelector('.component-header-photo');
    const headerNameCamp = document.querySelector('.component-header-name');
    const footerPhotoCamp = document.querySelector('.component-footer-photo');

    this.friend = friend;
    this.photoId = id;

    headerPhotoCamp.style.backgrounImage = `url('${friend.photo_50}')`;
    headerNameCamp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoCamp.style.backgrounImage = `url(${url})`;
    footerPhotoCamp.style.backgrounImage = `url('${model.me.photo_50}')`;
    this.setLikes(stats.likes, stats.leked);
    this.setComments(stats.comments);
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

    document
      .querySelector('component-footer-container-social-likes')
      .addEventListener('click', async () => {
        const { likes, liked } = await model.like(this.photoId);
        this.setLikes(likes, liked);
      });

    document
      .querySelector('component-footer-container-social-comments')
      .addEventListener('click', async () => {
        document.querySelector('component-comments').classList.remove('hidden');
        await this.loadComments(this.photoId);
      });

    const input = document.querySelector('component-comments-container-form-input');

    document.querySelector('component-comments').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        document.querySelector('component-comments').classList.add('hidden');
      }
    });

    document
      .querySelector('component-comments-container-form-send')
      .addEventListener('click', async () => {
        if (input.value.trim().length) {
          await model.postComments(this.photoId, input.value.trim());
          input.value = '';
          await this.loadComments(this.photoId);
        }
      });
  },

  async loadComments(photo) {
    const comments = await model.getComments(photo);
    const commentsElements = commentsTempate({
      list: comments.map((comments) => {
        return {
          name: `${comments.user.first_name ?? ''} ${comments.user.last_name ?? ''}`,
          photo: comments.user.photo_50,
          text: comments.text,
        };
      }),
    });

    document.querySelector('component-comments-container-list').innerHTML = '';
    document.querySelector('component-comments-container-list').append(commentsElements);
    this.setComments(comments.length);
  },

  setLikes(total, liked) {
    const likesElement = document.querySelector(
      'component-footer-container-social-likes'
    );
    likesElement.innerText = total;

    if (liked) {
      likesElement.classList.add('liked');
    } else {
      likesElement.classList.remove('liked');
    }
  },

  setComments(total) {
    const likesElement = document.querySelector(
      'component-footer-container-social-comments'
    );
    likesElement.innerText = total;
  },

  logout() {},

  getFriends() {},

  getUsers(ids) {},
};
