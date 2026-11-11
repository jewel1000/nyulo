import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { parsePagination } from '../utils/pagination.js';
import * as contactService from '../services/contact.service.js';

export const createContact = asyncHandler(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  ApiResponse.send(res, 201, { id: contact._id }, 'Thanks! We received your message and will reach out soon.');
});

export const getContacts = asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 20 });
  const { items, meta } = await contactService.listContacts({ status: req.query.status, page, limit, skip });
  ApiResponse.send(res, 200, items, 'Contacts fetched', meta);
});
