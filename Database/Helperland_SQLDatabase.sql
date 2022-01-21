create database Helperland;

create table HUser
(
	UserRoleId tinyint,
	UserId int CONSTRAINT PK_UserId PRIMARY KEY NOT NULL IDENTITY(1, 1),
	Email varchar(255) CONSTRAINT UK_UserEmail UNIQUE NOT NULL,
	Password binary(128)
);

create table CityMaster
(
	PostalCode varchar(10) CONSTRAINT PK_PostalCode PRIMARY KEY NOT NULL,
	CityName varchar(200)
);

create table CustomerDetails
(
	CustomerId int CONSTRAINT PK_CustomerId PRIMARY KEY NOT NULL,
	FirstName varchar(50),
	LastName varchar(50),
	Mobile varchar(15),
	DOB date,
	PreferedLanguage tinyint,
	CONSTRAINT FK_CustomerId FOREIGN KEY(CustomerId) REFERENCES HUser(UserId)
);

create table ServiceProviderDetails
(
	ServiceProviderId int CONSTRAINT PK_ServiceProviderId PRIMARY KEY NOT NULL,
	IsActive bit DEFAULT 0,
	FirstName varchar(50),
	LastName varchar(50),
	Mobile varchar(15),
	DOB date,
	Nationality tinyint,
	Gender tinyint,
	Avtar varchar(500),
	StreetName varchar(500),
	HouseNo varchar(20),
	PostalCode varchar(10),
	CONSTRAINT FK_ServiceProviderId FOREIGN KEY(ServiceProviderId) REFERENCES HUser(UserId),
	CONSTRAINT FK_SPPostalCode FOREIGN KEY(PostalCode) REFERENCES CityMaster(PostalCode)
);

create table ServiceRequest
(
	ServiceRequestId int CONSTRAINT PK_ServiceRequestId PRIMARY KEY NOT NULL IDENTITY(1, 1),
	ServiceRequestIssuedDatetime datetime,
	CustomerId int,
	ServiceDateTime datetime,
	ServiceDuration float,
	ExtraServices varchar(50),
	CommentOnService varchar(500),
	IsPets bit,
	ServiceProviderId int,
	ServiceStatus tinyint,
	PerCleaningRate float,
	CommentOnCancelService varchar(500),
	CommentOnRescheduleService varchar(500),
	CONSTRAINT FK_SRCustomerId FOREIGN KEY(CustomerId) REFERENCES HUser(UserId),
	CONSTRAINT FK_SRServiceProviderId FOREIGN KEY(ServiceProviderId) REFERENCES HUser(UserId)
);

create table CustomerAddress
(
	CustomerId int CONSTRAINT PK_CACustomerId PRIMARY KEY NOT NULL,
	StreetName varchar(500),
	HouseNo varchar(20),
	PostalCode varchar(10),
	Mobile varchar(15),
	CONSTRAINT FK_CACustomerId FOREIGN KEY(CustomerId) REFERENCES HUser(UserId),
	CONSTRAINT FK_CAPostalCode FOREIGN KEY(PostalCode) REFERENCES CityMaster(PostalCode)
);

create table ServiceProviderRatings
(
	ServiceRequestId int CONSTRAINT PK_SPRServiceRequestId PRIMARY KEY NOT NULL,
	ServiceProviderId int,
	OntimeArrivalRate float,
	FriendlyRate float,
	QltyOfServiceRate float,
	Feedback varchar(500),
	CONSTRAINT FK_ServiceRequestId FOREIGN KEY(ServiceRequestId) REFERENCES ServiceRequest(ServiceRequestId),
	CONSTRAINT FK_SPRServiceProviderId FOREIGN KEY(ServiceProviderId) REFERENCES HUser(UserId)
);

create table BlockedCustomer
(
	UId int CONSTRAINT PK_UId PRIMARY KEY NOT NULL IDENTITY(1, 1),
	ServiceProviderId int,
	BlockedCustomerId int,
	CONSTRAINT FK_BCServiceProviderId FOREIGN KEY(ServiceProviderId) REFERENCES HUser(UserId),
	CONSTRAINT FK_BCBlockedCustomerId FOREIGN KEY(BlockedCustomerId) REFERENCES HUser(UserId)
);