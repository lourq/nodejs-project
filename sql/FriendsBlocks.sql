CREATE TABLE FriendsBlocks (
    PlayerID INT,
    FriendBlockID INT,
    IsBlocked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (FriendBlockID) REFERENCES Players(PlayerID),
    PRIMARY KEY (PlayerID, FriendBlockID)
);