CREATE TABLE Players (
    PlayerID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Wins INT DEFAULT 0,
    Losses INT DEFAULT 0,
    Settings JSON,
    Preferences JSON
);
