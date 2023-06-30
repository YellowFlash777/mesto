export default class UserInfo {
  constructor(profileSelectorName, profileSelectorJob, profileSelectorImage ) {
    this._profileSelectorName = document.querySelector(profileSelectorName);
    this._profileSelectorJob = document.querySelector(profileSelectorJob);
    this._profileSelectorImage = document.querySelector(profileSelectorImage);
  }
  getUserInfo() {
    return {
      name: this._profileSelectorName.textContent,
      description: this._profileSelectorJob.textContent,
    };
  }

  setUserInfo({ name, description, avatar }) {
    this._profileSelectorName.textContent = name;
    this._profileSelectorJob.textContent = description;
    this._profileSelectorImage.src = avatar;
  }
}
