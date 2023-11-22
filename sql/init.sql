CREATE DATABASE among_us_db;

use among_us_db;

CREATE TABLE Players (
    PlayerID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL,
    IP VARCHAR(15) NOT NULL
);

CREATE TABLE GameSessions (
    SessionID INT AUTO_INCREMENT PRIMARY KEY,
    User VARCHAR(255),
    ImpostorID INT,
    FOREIGN KEY (User) REFERENCES Players(Username),
    FOREIGN KEY (ImpostorID) REFERENCES Players(PlayerID)
);


CREATE TABLE Tasks (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE ChatLogs (
    ChatID INT AUTO_INCREMENT PRIMARY KEY,
    SessionID INT,
    Message VARCHAR(100) NOT NULL,
    TimeStamp TIME NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES GameSessions(SessionID)
);

CREATE TABLE GameEvents (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    SessionID INT NOT NULL,
    EventType VARCHAR(255) NOT NULL,
    EventTime DATETIME,
    PlayerID INT,
    FOREIGN KEY (SessionID) REFERENCES GameSessions(SessionID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
);

CREATE TABLE GameSettings (
    SettingID INT AUTO_INCREMENT PRIMARY KEY,
    SessionID INT,
    Settings JSON,
    FOREIGN KEY (SessionID) REFERENCES GameSessions(SessionID)
);