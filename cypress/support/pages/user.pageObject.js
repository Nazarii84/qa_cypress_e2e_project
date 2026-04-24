class UserPageObject {
  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }
}

export default UserPageObject;
