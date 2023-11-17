CREATE TABLE GameSessions (
    SessionID INT AUTO_INCREMENT PRIMARY KEY,
    StartTime DATETIME,
    EndTime DATETIME,
    ImpostorID INT,
    FOREIGN KEY (ImpostorID) REFERENCES Players(PlayerID)
);
