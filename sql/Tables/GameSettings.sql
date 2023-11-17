CREATE TABLE GameSettings (
    SettingID INT AUTO_INCREMENT PRIMARY KEY,
    SessionID INT,
    Settings JSON,
    FOREIGN KEY (SessionID) REFERENCES GameSessions(SessionID)
);
