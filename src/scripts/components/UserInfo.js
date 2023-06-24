export default class UserInfo {
  constructor(profileSelectorName, profileSelectorJob) {
    this._profileSelectorName = document.querySelector(profileSelectorName);
    this._profileSelectorJob = document.querySelector(profileSelectorJob);
  }
  getUserInfo() {
    return {
      name: this._profileSelectorName.textContent,
      description: this._profileSelectorJob.textContent,
    };
  }

  setUserInfo(userData) {
    this._profileSelectorName.textContent = userData.name;
    this._profileSelectorJob.textContent = userData.description;
  }
}
