import prisma from '../config/database.js';
import { paginate } from '../utils/helpers.js';
import { AppError } from '../middleware/errorHandler.js';
import cacheService from '../services/cacheService.js';
import uploadService from '../services/uploadService.js';

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  const cacheKey = 'team:all';
  const cached = await cacheService.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const members = await prisma.teamMember.findMany({
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  await cacheService.set(cacheKey, { data: members }, 3600);
  res.json({ data: members });
};

// Get team member by ID
export const getTeamMemberById = async (req, res) => {
  const { id } = req.params;

  const member = await prisma.teamMember.findUnique({
    where: { id },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!member) {
    throw new AppError('Team member not found', 404);
  }

  res.json({ data: member });
};

// Add team member (admin only)
export const addTeamMember = async (req, res) => {
  const { name, role, bio, email, phone, order } = req.body;
  const photoUrl = req.file ? uploadService.getFileUrl(req.file.filename) : null;

  const member = await prisma.teamMember.create({
    data: {
      name,
      role,
      bio,
      email,
      phone,
      photoUrl,
      order: order || 0,
      adminId: req.admin.id,
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Invalidate cache
  await cacheService.invalidatePattern('team:');

  res.status(201).json({
    message: 'Team member added successfully',
    data: member,
  });
};

// Update team member (admin only)
export const updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const { name, role, bio, email, phone, order } = req.body;

  const member = await prisma.teamMember.findUnique({
    where: { id },
  });

  if (!member) {
    throw new AppError('Team member not found', 404);
  }

  // Delete old photo if new one is uploaded
  let photoUrl = member.photoUrl;
  if (req.file) {
    if (member.photoUrl) {
      const oldFilename = member.photoUrl.split('/').pop();
      if (oldFilename) {
        await uploadService.deleteFile(oldFilename);
      }
    }
    photoUrl = uploadService.getFileUrl(req.file.filename);
  }

  const updatedMember = await prisma.teamMember.update({
    where: { id },
    data: {
      name: name || member.name,
      role: role || member.role,
      bio: bio !== undefined ? bio : member.bio,
      email: email !== undefined ? email : member.email,
      phone: phone !== undefined ? phone : member.phone,
      photoUrl,
      order: order !== undefined ? order : member.order,
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Invalidate cache
  await cacheService.invalidatePattern('team:');

  res.json({
    message: 'Team member updated successfully',
    data: updatedMember,
  });
};

// Delete team member (admin only)
export const deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  const member = await prisma.teamMember.findUnique({
    where: { id },
  });

  if (!member) {
    throw new AppError('Team member not found', 404);
  }

  // Delete associated photo
  if (member.photoUrl) {
    const filename = member.photoUrl.split('/').pop();
    if (filename) {
      await uploadService.deleteFile(filename);
    }
  }

  await prisma.teamMember.delete({
    where: { id },
  });

  // Invalidate cache
  await cacheService.invalidatePattern('team:');

  res.json({
    message: 'Team member deleted successfully',
  });
};

