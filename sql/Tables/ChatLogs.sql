CREATE TABLE ChatLogs (
    ChatID INT AUTO_INCREMENT PRIMARY KEY,
    SessionID INT,
    PlayerID INT,
    Message VARCHAR(100),
    TimeStamp DATETIME,
    FOREIGN KEY (SessionID) REFERENCES GameSessions(SessionID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    CREATE INDEX idx_sessionid ON ChatLogs(SessionID),
    CREATE INDEX idx_playerid ON ChatLogs(PlayerID);
);
