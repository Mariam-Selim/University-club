import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create super admin
  const superAdminPassword = await bcrypt.hash('password123', 10);
  const superAdmin = await prisma.admin.upsert({
    where: { email: 'admin@university.edu' },
    update: {},
    create: {
      email: 'admin@university.edu',
      name: 'Super Admin',
      password: superAdminPassword,
      phone: '+1234567890',
      isSuperAdmin: true,
      status:'approved',
    },
  });
  console.log('✅ Created super admin:', superAdmin.email);

  // Create regular admin
  const adminPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin2@university.edu' },
    update: {},
    create: {
      email: 'admin2@university.edu',
      name: 'Regular Admin',
      password: adminPassword,
      phone: '+1234567891',
      isSuperAdmin: false,
      status:'approved',
    },
  });
  console.log('✅ Created admin:', admin.email);

  // Create students
  const studentPassword = await bcrypt.hash('password123', 10);
  const students = await Promise.all([
    prisma.student.upsert({
      where: { email: 'student@university.edu' },
      update: {},
      create: {
        email: 'student@university.edu',
        name: 'John Doe',
        password: studentPassword,
        level: 'Sophomore',
        phone: '+1234567892',
        isVerified: true,
      },
    }),
    prisma.student.upsert({
      where: { email: 'student2@university.edu' },
      update: {},
      create: {
        email: 'student2@university.edu',
        name: 'Jane Smith',
        password: studentPassword,
        level: 'Junior',
        phone: '+1234567893',
        isVerified: true,
      },
    }),
    prisma.student.upsert({
      where: { email: 'student3@university.edu' },
      update: {},
      create: {
        email: 'student3@university.edu',
        name: 'Bob Johnson',
        password: studentPassword,
        level: 'Senior',
        phone: '+1234567894',
        isVerified: false,
      },
    }),
  ]);
  console.log('✅ Created students:', students.length);

  // Create events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Welcome Back Party',
        description: 'Join us for a fun welcome back party to start the semester!',
        date: new Date('2024-02-15T18:00:00Z'),
        location: 'Student Center',
        category: 'Social',
        adminId: superAdmin.id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Tech Workshop: Introduction to Web Development',
        description: 'Learn the basics of web development with HTML, CSS, and JavaScript.',
        date: new Date('2024-02-20T14:00:00Z'),
        location: 'Computer Lab 101',
        category: 'Workshop',
        adminId: admin.id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Basketball Tournament',
        description: 'Annual inter-club basketball tournament. Sign up now!',
        date: new Date('2024-03-01T10:00:00Z'),
        location: 'Sports Complex',
        category: 'Sports',
        adminId: superAdmin.id,
      },
    }),
  ]);
  console.log('✅ Created events:', events.length);

  // Create announcements
  const announcements = await Promise.all([
    prisma.announcement.create({
      data: {
        title: 'Club Meeting This Friday',
        content: 'We will be having our monthly club meeting this Friday at 3 PM. All members are encouraged to attend.',
        location: 'Room 205',
        category: 'General',
        date: new Date(),
        adminId: superAdmin.id,
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'New Member Orientation',
        content: 'New members orientation session will be held next week. Please register to attend.',
        location: 'Main Hall',
        category: 'Event',
        date: new Date(),
        adminId: admin.id,
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'Important: Deadline Extension',
        content: 'The deadline for event registration has been extended to next Friday.',
        category: 'Important',
        date: new Date(),
        adminId: superAdmin.id,
      },
    }),
  ]);
  console.log('✅ Created announcements:', announcements.length);

  // Create gallery photos
  const galleryPhotos = await Promise.all([
    prisma.galleryPhoto.create({
      data: {
        imageUrl: '/uploads/placeholder-image.jpg',
        title: 'Club Meeting Photo',
        category: 'Events',
        description: 'Photo from our recent club meeting',
        adminId: superAdmin.id,
      },
    }),
    prisma.galleryPhoto.create({
      data: {
        imageUrl: '/uploads/placeholder-image.jpg',
        title: 'Team Photo 2024',
        category: 'Team',
        description: 'Official team photo for 2024',
        adminId: admin.id,
      },
    }),
  ]);
  console.log('✅ Created gallery photos:', galleryPhotos.length);

  // Create team members
  const teamMembers = await Promise.all([
    prisma.teamMember.create({
      data: {
        name: 'Alice Williams',
        role: 'President',
        bio: 'Senior student majoring in Computer Science. Passionate about technology and leadership.',
        email: 'alice@university.edu',
        phone: '+1234567895',
        order: 1,
        adminId: superAdmin.id,
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'Charlie Brown',
        role: 'Vice President',
        bio: 'Junior student with experience in event planning and management.',
        email: 'charlie@university.edu',
        phone: '+1234567896',
        order: 2,
        adminId: admin.id,
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'Diana Prince',
        role: 'Secretary',
        bio: 'Sophomore student responsible for club communications and records.',
        email: 'diana@university.edu',
        order: 3,
        adminId: superAdmin.id,
      },
    }),
  ]);
  console.log('✅ Created team members:', teamMembers.length);

  // Create contact messages
  const contactMessages = await Promise.all([
    prisma.contactMessage.create({
      data: {
        name: 'Visitor One',
        email: 'visitor1@example.com',
        subject: 'Question about membership',
        message: 'I would like to know more about joining the club. What are the requirements?',
        adminId: superAdmin.id,
        isRead: false,
      },
    }),
    prisma.contactMessage.create({
      data: {
        name: 'Visitor Two',
        email: 'visitor2@example.com',
        subject: 'Event inquiry',
        message: 'When is the next event? I would like to attend.',
        adminId: admin.id,
        isRead: true,
      },
    }),
  ]);
  console.log('✅ Created contact messages:', contactMessages.length);

  // Create lost & found items
  const lostFoundItems = await Promise.all([
    prisma.lostAndFound.create({
      data: {
        title: 'Lost: Blue Backpack',
        description: 'Blue backpack with laptop inside. Last seen in the library.',
        status: 'lost',
        location: 'Main Library',
        contactInfo: 'contact@university.edu',
        adminId: superAdmin.id,
      },
    }),
    prisma.lostAndFound.create({
      data: {
        title: 'Found: Black Wallet',
        description: 'Black leather wallet found in the cafeteria. Contains ID and credit cards.',
        status: 'found',
        location: 'Cafeteria',
        contactInfo: 'security@university.edu',
        adminId: admin.id,
      },
    }),
    prisma.lostAndFound.create({
      data: {
        title: 'Lost: iPhone 13',
        description: 'iPhone 13 with black case. Lost during the basketball game.',
        status: 'lost',
        location: 'Sports Complex',
        contactInfo: 'lost@university.edu',
        adminId: superAdmin.id,
      },
    }),
  ]);
  console.log('✅ Created lost & found items:', lostFoundItems.length);

  // Create student-announcement relationships
  await prisma.studentAnnouncement.createMany({
    data: [
      {
        studentId: students[0].id,
        announcementId: announcements[0].id,
      },
      {
        studentId: students[0].id,
        announcementId: announcements[1].id,
      },
      {
        studentId: students[1].id,
        announcementId: announcements[0].id,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Created student-announcement relationships');

  // Create admin requests
  const adminRequests = await Promise.all([
    prisma.adminRequest.create({
      data: {
        email: 'newadmin@university.edu',
        name: 'New Admin Request',
        phone: '+1234567897',
        message: 'I would like to become an admin.',
        status: 'pending',
        requestedById: superAdmin.id,
      },
    }),
  ]);
  console.log('✅ Created admin requests:', adminRequests.length);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📝 Default Credentials:');
  console.log('Super Admin: admin@university.edu / password123');
  console.log('Admin: admin2@university.edu / password123');
  console.log('Student: student@university.edu / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

