CREATE TABLE GameEvents (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    SessionID INT,
    EventType VARCHAR(255) NOT NULL,
    EventTime DATETIME,
    PlayerID INT,
    FOREIGN KEY (SessionID) REFERENCES GameSessions(SessionID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
);
