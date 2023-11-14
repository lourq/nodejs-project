CREATE TABLE ChatLogs (
    ChatID INT AUTO_INCREMENT PRIMARY KEY,
    SessionID INT,
    PlayerID INT,
    Message TEXT,
    TimeStamp DATETIME,
    FOREIGN KEY (SessionID) REFERENCES GameSessions(SessionID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
);
