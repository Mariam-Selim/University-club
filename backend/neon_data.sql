--
-- PostgreSQL database dump
--

\restrict 9RDs5u5wqRMHHoLVf06yGRv3mkJBoEudD90srDADg4u06SiphBTYCzSfgzxzwtV

-- Dumped from database version 16.11 (74c6bb6)
-- Dumped by pg_dump version 16.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6947f807-5ec3-4a52-bbe4-9d282604be04', '5183612cd7d2d5cd53b6a739271f42c5affea94fb3b383b3aac5e86f8354fcdc', '2026-01-05 01:13:07.056429+00', '20260105011303_init', NULL, NULL, '2026-01-05 01:13:04.388131+00', 1);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.admins (id, email, name, phone, password, "isSuperAdmin", "createdAt", "updatedAt") VALUES ('cmk0gvbk00000wd2lmn2ysi0o', 'admin@university.edu', 'Super Admin', '+1234567890', '$2a$10$qj7M60X5VRE8KMDBDE.Cm.7aVkLuP276EGgdK4dKbwnDBSjUMbqFW', true, '2026-01-05 01:13:11.999', '2026-01-05 01:13:11.999');
INSERT INTO public.admins (id, email, name, phone, password, "isSuperAdmin", "createdAt", "updatedAt") VALUES ('cmk0gvcyz0001wd2lkhns7dh9', 'admin2@university.edu', 'Regular Admin', '+1234567891', '$2a$10$j9l9O8Pzpe2VsQWvgFsSUu7HKb5B4s./YF/bmv2gqRUUn1SBn0MQW', false, '2026-01-05 01:13:13.835', '2026-01-05 01:13:13.835');


--
-- Data for Name: admin_requests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.admin_requests (id, email, name, phone, message, status, "createdAt", "updatedAt", "requestedById", "approvedById") VALUES ('cmk0gvtxw0012wd2li2suue9c', 'newadmin@university.edu', 'New Admin Request', '+1234567897', 'I would like to become an admin.', 'pending', '2026-01-05 01:13:35.828', '2026-01-05 01:13:35.828', 'cmk0gvbk00000wd2lmn2ysi0o', NULL);


--
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.announcements (id, title, content, "imageUrl", date, location, category, "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvqww000gwd2lv9lp59o2', 'Important: Deadline Extension', 'The deadline for event registration has been extended to next Friday.', NULL, '2026-01-05 01:13:31.731', NULL, 'Important', '2026-01-05 01:13:31.735', '2026-01-05 01:13:31.735', 'cmk0gvbk00000wd2lmn2ysi0o');
INSERT INTO public.announcements (id, title, content, "imageUrl", date, location, category, "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvqs7000ewd2lcbvc9gzb', 'Club Meeting This Friday', 'We will be having our monthly club meeting this Friday at 3 PM. All members are encouraged to attend.', NULL, '2026-01-05 01:13:31.73', 'Room 205', 'General', '2026-01-05 01:13:31.735', '2026-01-05 01:13:31.735', 'cmk0gvbk00000wd2lmn2ysi0o');
INSERT INTO public.announcements (id, title, content, "imageUrl", date, location, category, "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvqs7000dwd2lttew5l4b', 'New Member Orientation', 'New members orientation session will be held next week. Please register to attend.', NULL, '2026-01-05 01:13:31.73', 'Main Hall', 'Event', '2026-01-05 01:13:31.735', '2026-01-05 01:13:31.735', 'cmk0gvcyz0001wd2lkhns7dh9');


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.contact_messages (id, name, email, subject, message, "isRead", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvsoa000uwd2lapcoc9ki', 'Visitor Two', 'visitor2@example.com', 'Event inquiry', 'When is the next event? I would like to attend.', true, '2026-01-05 01:13:34.186', '2026-01-05 01:13:34.186', 'cmk0gvcyz0001wd2lkhns7dh9');
INSERT INTO public.contact_messages (id, name, email, subject, message, "isRead", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvsoa000twd2lxlnftds3', 'Visitor One', 'visitor1@example.com', 'Question about membership', 'I would like to know more about joining the club. What are the requirements?', false, '2026-01-05 01:13:34.186', '2026-01-05 01:13:34.186', 'cmk0gvbk00000wd2lmn2ysi0o');


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.events (id, title, description, date, location, category, "imageUrl", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvpzt0007wd2lj0todc5z', 'Tech Workshop: Introduction to Web Development', 'Learn the basics of web development with HTML, CSS, and JavaScript.', '2024-02-20 14:00:00', 'Computer Lab 101', 'Workshop', NULL, '2026-01-05 01:13:30.713', '2026-01-05 01:13:30.713', 'cmk0gvcyz0001wd2lkhns7dh9');
INSERT INTO public.events (id, title, description, date, location, category, "imageUrl", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvpzu0008wd2lt414knvm', 'Basketball Tournament', 'Annual inter-club basketball tournament. Sign up now!', '2024-03-01 10:00:00', 'Sports Complex', 'Sports', NULL, '2026-01-05 01:13:30.713', '2026-01-05 01:13:30.713', 'cmk0gvbk00000wd2lmn2ysi0o');
INSERT INTO public.events (id, title, description, date, location, category, "imageUrl", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvqbc000awd2li9bauzx0', 'Welcome Back Party', 'Join us for a fun welcome back party to start the semester!', '2024-02-15 18:00:00', 'Student Center', 'Social', NULL, '2026-01-05 01:13:30.713', '2026-01-05 01:13:30.713', 'cmk0gvbk00000wd2lmn2ysi0o');


--
-- Data for Name: gallery_photos; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.gallery_photos (id, "imageUrl", title, category, description, "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvrco000jwd2lf3q7w4l5', '/uploads/placeholder-image.jpg', 'Team Photo 2024', 'Team', 'Official team photo for 2024', '2026-01-05 01:13:32.472', '2026-01-05 01:13:32.472', 'cmk0gvcyz0001wd2lkhns7dh9');
INSERT INTO public.gallery_photos (id, "imageUrl", title, category, description, "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvrco000kwd2la67ozbch', '/uploads/placeholder-image.jpg', 'Club Meeting Photo', 'Events', 'Photo from our recent club meeting', '2026-01-05 01:13:32.472', '2026-01-05 01:13:32.472', 'cmk0gvbk00000wd2lmn2ysi0o');


--
-- Data for Name: lost_and_found; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.lost_and_found (id, title, description, status, "imageUrl", location, "contactInfo", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvsz30010wd2lzuh9bhmw', 'Found: Black Wallet', 'Black leather wallet found in the cafeteria. Contains ID and credit cards.', 'found', NULL, 'Cafeteria', 'security@university.edu', '2026-01-05 01:13:34.574', '2026-01-05 01:13:34.574', 'cmk0gvcyz0001wd2lkhns7dh9');
INSERT INTO public.lost_and_found (id, title, description, status, "imageUrl", location, "contactInfo", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvsz3000zwd2li8yve8su', 'Lost: iPhone 13', 'iPhone 13 with black case. Lost during the basketball game.', 'lost', NULL, 'Sports Complex', 'lost@university.edu', '2026-01-05 01:13:34.574', '2026-01-05 01:13:34.574', 'cmk0gvbk00000wd2lmn2ysi0o');
INSERT INTO public.lost_and_found (id, title, description, status, "imageUrl", location, "contactInfo", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvsz3000ywd2l5f15n6rh', 'Lost: Blue Backpack', 'Blue backpack with laptop inside. Last seen in the library.', 'lost', NULL, 'Main Library', 'contact@university.edu', '2026-01-05 01:13:34.574', '2026-01-05 01:13:34.574', 'cmk0gvbk00000wd2lmn2ysi0o');


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.students (id, email, name, level, password, phone, "googleId", "isVerified", "createdAt", "updatedAt") VALUES ('cmk0gve0h0002wd2lvzt94xg3', 'student@university.edu', 'John Doe', 'Sophomore', '$2a$10$0vgBwpaD/r3Ya20M34EvvuR6zaQkKRE6HhBT9oWEOYHWttxC9.BY.', '+1234567892', NULL, true, '2026-01-05 01:13:15.185', '2026-01-05 01:13:15.185');
INSERT INTO public.students (id, email, name, level, password, phone, "googleId", "isVerified", "createdAt", "updatedAt") VALUES ('cmk0gvf0x0003wd2lbpchpojd', 'student2@university.edu', 'Jane Smith', 'Junior', '$2a$10$0vgBwpaD/r3Ya20M34EvvuR6zaQkKRE6HhBT9oWEOYHWttxC9.BY.', '+1234567893', NULL, true, '2026-01-05 01:13:15.185', '2026-01-05 01:13:15.185');
INSERT INTO public.students (id, email, name, level, password, phone, "googleId", "isVerified", "createdAt", "updatedAt") VALUES ('cmk0gvg7n0004wd2l088gdrhf', 'student3@university.edu', 'Bob Johnson', 'Senior', '$2a$10$0vgBwpaD/r3Ya20M34EvvuR6zaQkKRE6HhBT9oWEOYHWttxC9.BY.', '+1234567894', NULL, false, '2026-01-05 01:13:15.185', '2026-01-05 01:13:15.185');
INSERT INTO public.students (id, email, name, level, password, phone, "googleId", "isVerified", "createdAt", "updatedAt") VALUES ('cmk0o6nf70000c1whplnb6s1p', 'rana.ahmed@suv.edu.eg', 'Renada Ahmed', 'Junior', '$2a$10$D8LgWrtmjw6Rs0/gTyDri.lL4gTGkY9W8owCQ6kDJgCdRIju7eEYW', '01028971197', NULL, false, '2026-01-05 04:37:57.907', '2026-01-05 04:37:57.907');
INSERT INTO public.students (id, email, name, level, password, phone, "googleId", "isVerified", "createdAt", "updatedAt") VALUES ('cmk17izji00005k3dkqtbsokp', 'adam2017@university.edu.eg', 'Adam Ahmed', 'Freshman', '$2a$10$cSBSXt1DtN55KRQF.Vc0du8.QadV/iQkGLFJtlUWvf/UQOYxJdA1i', '01298852906', NULL, false, '2026-01-05 13:39:26.191', '2026-01-05 13:39:26.191');


--
-- Data for Name: student_announcements; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.student_announcements ("studentId", "announcementId", "joinedAt") VALUES ('cmk0gve0h0002wd2lvzt94xg3', 'cmk0gvqs7000ewd2lcbvc9gzb', '2026-01-05 01:13:34.954');
INSERT INTO public.student_announcements ("studentId", "announcementId", "joinedAt") VALUES ('cmk0gve0h0002wd2lvzt94xg3', 'cmk0gvqs7000dwd2lttew5l4b', '2026-01-05 01:13:34.954');
INSERT INTO public.student_announcements ("studentId", "announcementId", "joinedAt") VALUES ('cmk0gvf0x0003wd2lbpchpojd', 'cmk0gvqs7000ewd2lcbvc9gzb', '2026-01-05 01:13:34.954');


--
-- Data for Name: team_members; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.team_members (id, name, role, "photoUrl", bio, email, phone, "order", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvrwk000owd2ldeef3u00', 'Diana Prince', 'Secretary', NULL, 'Sophomore student responsible for club communications and records.', 'diana@university.edu', NULL, 3, '2026-01-05 01:13:33.188', '2026-01-05 01:13:33.188', 'cmk0gvbk00000wd2lmn2ysi0o');
INSERT INTO public.team_members (id, name, role, "photoUrl", bio, email, phone, "order", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvrwk000nwd2lj3upphi2', 'Alice Williams', 'President', NULL, 'Senior student majoring in Computer Science. Passionate about technology and leadership.', 'alice@university.edu', '+1234567895', 1, '2026-01-05 01:13:33.188', '2026-01-05 01:13:33.188', 'cmk0gvbk00000wd2lmn2ysi0o');
INSERT INTO public.team_members (id, name, role, "photoUrl", bio, email, phone, "order", "createdAt", "updatedAt", "adminId") VALUES ('cmk0gvs1g000qwd2li74ff29s', 'Charlie Brown', 'Vice President', NULL, 'Junior student with experience in event planning and management.', 'charlie@university.edu', '+1234567896', 2, '2026-01-05 01:13:33.188', '2026-01-05 01:13:33.188', 'cmk0gvcyz0001wd2lkhns7dh9');


--
-- PostgreSQL database dump complete
--

\unrestrict 9RDs5u5wqRMHHoLVf06yGRv3mkJBoEudD90srDADg4u06SiphBTYCzSfgzxzwtV

