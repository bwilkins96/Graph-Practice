// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;

    this.users[this.currentID] = {id: this.currentID, name: name}
    this.follows[this.currentID] = new Set();

    return this.currentID;
  }

  getUser(userID) {
    if (this.users[userID]) {return this.users[userID]}
    else {return null}
  }

  follow(userID1, userID2) {
    if (!this.getUser(userID2)) {return false}

    if (this.follows[userID1]) {
      this.follows[userID1].add(userID2)
    } else { return false }

    return true;
  }

  getFollows(userID) {
    if (this.follows[userID]) {return this.follows[userID]}
  }

  getFollowers(userID) {
    let follows; let followerID = 1; const followers = new Set();
    if (this.follows[1]) {follows = this.follows[1]}

    while (follows) {
      if (follows.has(userID)) {followers.add(followerID)}

      followerID++;
      follows = this.follows[followerID];
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    const recommended = []; const queue = [];
    const visited = new Set(); visited.add(userID);

    this.getFollows(userID).forEach( id => {
      visited.add(id);
      queue.push(id);
    })

    let degreeCount = 1;

    while (queue.length > 0) {

      let currentUserID = queue[0];
      let currentFollows = this.getFollows(currentUserID);

      currentFollows.forEach ( id => {
        if (!visited.has(id)) {
          visited.add(id);
          recommended.push(id);
        }
      });

      if (degreeCount < degrees) {
        queue.forEach( id => {
          let follows = this.getFollows(id);
          follows.forEach (idF => {
            queue.push(idF)
          });
        });

        degreeCount++;
      }

      queue.shift();
    }

    return recommended;
  }
}

module.exports = SocialNetwork;

let socialNetwork = new SocialNetwork();

let userID1 = socialNetwork.addUser("User 1");
let userID2 = socialNetwork.addUser("User 2");
let userID3 = socialNetwork.addUser("User 3");
let userID4 = socialNetwork.addUser("User 4");
let userID5 = socialNetwork.addUser("User 5");
let userID6 = socialNetwork.addUser("User 6");

socialNetwork.follow(1, 2);
socialNetwork.follow(2, 3);
socialNetwork.follow(3, 4);
socialNetwork.follow(3, 5);
socialNetwork.follow(4, 1);
socialNetwork.follow(4, 2);
socialNetwork.follow(5, 6);

console.log(socialNetwork.getRecommendedFollows(1, 1));
console.log(socialNetwork.getRecommendedFollows(1, 2));
console.log(socialNetwork.getRecommendedFollows(1, 3));
