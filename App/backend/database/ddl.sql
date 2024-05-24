SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Horses;
DROP TABLE IF EXISTS Owners;
DROP TABLE IF EXISTS HorsesAndRiders;
DROP TABLE IF EXISTS Riders;
DROP TABLE IF EXISTS HorseShows;
DROP TABLE IF EXISTS HorsesEntered;

CREATE OR REPLACE TABLE Owners(
    OwnerID Int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    FirstName Varchar(255) NOT NULL, 
    LastName Varchar(255) NOT NULL,
    Email Varchar(255) NOT NULL,
    Address Varchar(255) NOT NULL,
    PRIMARY KEY (OwnerID)
);

CREATE OR REPLACE TABLE Riders(
    RiderID Int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    FirstName Varchar(255) NOT NULL,
    LastName Varchar(255) NOT NULL,
    Email Varchar(255) NOT NULL,
    Address Varchar(255) NOT NULL
);

CREATE OR REPLACE TABLE Horses(
    HorseID Int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    OwnerID Int,
    ShowName Varchar(255) NOT NULL,
    Breed Varchar(255) NOT NULL,
    Age Int NOT NULL,
    Discipline Varchar(255) NOT NULL,
    PrizeMoneyWon Int DEFAULT 0,
    PRIMARY KEY (HorseID),
    FOREIGN KEY (OwnerID) REFERENCES Owners(OwnerID) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE HorsesAndRiders(
    HAndRID Int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    RiderID Int NOT NULL,
    HorseID Int NOT NULL,
    PRIMARY KEY (HAndRID),
    FOREIGN KEY (HorseID) REFERENCES Horses(HorseID) ON DELETE CASCADE,
    FOREIGN KEY (RiderID) REFERENCES Riders(RiderID) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE HorseShows(
    HorseShowID Int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    HorseShowName Varchar(255) NOT NULL,
    ShowDate Date NOT NULL,
    Location Varchar(255) NOT NULL,
    PrizeMoneyOffered Int(11) NOT NULL,
    NumEnteredHorse Int(11) NOT NULL,
    PRIMARY KEY (HorseShowID)
);

CREATE OR REPLACE TABLE Betters(
    BetterID Int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    BetterAmount Int NOT NULL,
    FirstName Varchar(255) NOT NULL,
    LastName Varchar(255) NOT NULL,
    PRIMARY KEY (BetterID)
);

CREATE OR REPLACE TABLE Bets(
    BetID Int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    BetterID Int NOT NULL,
    HorseShowID Int NOT NULL,
    HorseID Int NOT NULL,
    PRIMARY KEY (BetID),
    FOREIGN KEY (BetterID) REFERENCES Betters(BetterID) ON DELETE CASCADE,
    FOREIGN KEY (HorseShowID) REFERENCES HorseShows(HorseShowID) ON DELETE CASCADE,
    FOREIGN KEY (HorseID) REFERENCES Horses(HorseID) ON DELETE CASCADE
);


INSERT INTO Owners (FirstName, LastName, Email, Address)
VALUES ('Josephine', 'Darakjy', 'josephine_darakjy@darakjy.org', '4 B Blue Ridge Blvd Brighton Livingston MI'),
        ('Art', 'Venere', 'art@venere.org',	'8 W Cerritos Ave 54 Bridgeport Gloucester	NJ'),
        ('Lenna', 'Paprocki', 'lpaprocki@hotmail.com', '639 Main St	Anchorage Anchorage	AK'),
        ('Donette',	'Foller', 'donette.foller@cox.net', '34 Center St Hamilton Butler OH'),
        ('Simona', 'Morasca', 'simona@morasca.com', '3 Mcauley Dr Ashland OH');

INSERT INTO Riders (FirstName, LastName, Email, Address)
VALUES ('Myra',	'Munns', 'mmunns@cox.net', '461 Prospect Pl #316 Euless	Tarrant	TX'),
('Stephaine', 'Barfield', 'stephaine@barfield.com',	'47154 Whipple Ave Nw Gardena Los Angeles CA'),
('Lai', 'Gato', 'lai.gato@gato.org','37 Alabama Ave	Evanston Cook IL'),
('Stephen', 'Emigh', 'stephen_emigh@hotmail.com', '3777 E Richmond St #900 Akron Summit	OH'),
('Tyra', 'Shields', 'tshields@gmail.com', '3 Fort Worth Ave Philadelphia PA'),
('Cory', 'Gibes', 'cory.gibes@gmail.com', '83649 W Belmont Ave San Gabriel Los Angeles CA');

INSERT INTO Horses (OwnerID, ShowName, Breed, Age, Discipline, PrizeMoneyWon)
VALUES  (1, 'Delegate', 'Westphalian', 10, 'Jumper', 2500),
        (1, 'Romina', 'Hanovarian', 8, 'Hunter', 3000),
        (2, 'Anastasia', 'Selle Francais', 15, 'Equitation', 0),
        (3, 'Per Se', 'Dutch Warmblood', 22, 'Hunter', 0),
        (4, 'Bohemio Z', 'Zangersheide', 6, 'Jumper', 8000),
        (5, 'Paradigm', 'American Warmblood', 12, 'Hunter', 5000);


INSERT INTO HorsesAndRiders (RiderID, HorseID)
VALUES (2, 1), (5, 2), (4, 5), (6, 6);


INSERT INTO HorseShows (HorseShowName, ShowDate, Location, PrizeMoneyOffered, NumEnteredHorse)
VALUES ('Early Summer Classic', '2024-06-15', 'Portland, OR', 20000, 200),
    ('Oregon Trail', '2024-06-22', 'Bellevue, WA', 20000, 250),
    ('Willamette Classic', '2024-07-06', 'Del Mar, CA', 20000, 400),
    ('Country Classic', '2024-07-13', 'Sonoma, CA', 20000, 300),
    ('Oregon Summer Classic', '2024-08-17', 'Bend, OR', 20000, 250),
    ('Northwest Spectacular', '2024-08-24', 'Monroe, WA', 20000, 100);



INSERT INTO Betters (BetterAmount, FirstName, LastName)
VALUES (100, 'Natalie', 'Fern'),
    (500, 'Lisha', 'Centini'),
    (25, 'Arlene', 'Klusman'),
    (300, 'Alease', 'Buemi');

INSERT INTO Bets (BetterID, HorseShowID, HorseID)
VALUES
    (1, 30, 10),
    (2, 34, 12),
    (2, 31, 13),
    (3, 35, 14);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;