ALTER TABLE `appointments` ADD `calendlyEventUri` varchar(500);--> statement-breakpoint
ALTER TABLE `appointments` ADD `calendlyInviteeUri` varchar(500);--> statement-breakpoint
ALTER TABLE `appointments` ADD `calendlyStatus` varchar(50);--> statement-breakpoint
ALTER TABLE `appointments` ADD `calendlyStartTime` timestamp;--> statement-breakpoint
ALTER TABLE `appointments` ADD `calendlyEndTime` timestamp;--> statement-breakpoint
ALTER TABLE `attendances` ADD `appointmentId` int;--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_calendlyEventUri_unique` UNIQUE(`calendlyEventUri`);--> statement-breakpoint
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_appointmentId_appointments_id_fk` FOREIGN KEY (`appointmentId`) REFERENCES `appointments`(`id`) ON DELETE no action ON UPDATE no action;