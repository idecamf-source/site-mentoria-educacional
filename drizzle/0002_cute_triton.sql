CREATE TABLE `attendances` (
	`id` int AUTO_INCREMENT NOT NULL,
	`attendanceNumber` int NOT NULL,
	`attendanceDate` timestamp NOT NULL,
	`studentName` varchar(255) NOT NULL,
	`course` varchar(255) NOT NULL,
	`semester` varchar(50) NOT NULL,
	`observedAspects` text,
	`directivesTaken` text,
	`mentorId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `attendances_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_mentorId_users_id_fk` FOREIGN KEY (`mentorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;