CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`achievement_type` varchar(100) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`earned_at` timestamp DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coaching_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`focus_areas` text,
	`weekly_goals` text,
	`progress_notes` text,
	`next_review_date` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `coaching_plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` int NOT NULL,
	`question_id` int,
	`response_text` text,
	`response_duration` int,
	`ai_score` decimal(5,2),
	`ai_feedback` text,
	`strengths` text,
	`improvements` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `interview_scenarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`target_role` varchar(255),
	`target_industry` varchar(255),
	`difficulty` varchar(20),
	`question_ids` text,
	`is_template` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `interview_scenarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `practice_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`scenario_id` int,
	`started_at` timestamp DEFAULT (now()),
	`completed_at` timestamp,
	`duration` int,
	`overall_score` decimal(5,2),
	`confidence_score` decimal(5,2),
	`clarity_score` decimal(5,2),
	`relevance_score` decimal(5,2),
	`ai_feedback` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `practice_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `progress_tracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`metric_type` varchar(100) NOT NULL,
	`metric_value` decimal(5,2) NOT NULL,
	`improvement_percentage` decimal(5,2),
	`tracked_at` timestamp DEFAULT (now()),
	CONSTRAINT `progress_tracking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `question_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int NOT NULL,
	`type` varchar(50) NOT NULL,
	`difficulty` varchar(20) NOT NULL,
	`industry` varchar(100),
	`role` varchar(100),
	`question` text NOT NULL,
	`sample_answer` text,
	`evaluation_criteria` text,
	`tags` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resume_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resume_id` int NOT NULL,
	`section_type` varchar(50) NOT NULL,
	`title` varchar(255),
	`content` text NOT NULL,
	`order_index` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `resume_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resumes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`target_role` varchar(255),
	`target_industry` varchar(255),
	`is_primary` boolean DEFAULT false,
	`ai_optimization_score` decimal(5,2),
	`last_optimized_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `resumes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session_recordings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` int NOT NULL,
	`recording_type` varchar(20) NOT NULL,
	`file_url` varchar(500) NOT NULL,
	`duration` int,
	`file_size` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `session_recordings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`theme` varchar(20) DEFAULT 'light',
	`notifications` boolean DEFAULT true,
	`email_digest` boolean DEFAULT true,
	`preferred_industries` text,
	`preferred_roles` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `user_preferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_preferences_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`password_hash` varchar(255),
	`profile_picture` varchar(500),
	`created_at` timestamp DEFAULT (now()),
	`last_login_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
