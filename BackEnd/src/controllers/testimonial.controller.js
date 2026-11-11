import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { parsePagination } from '../utils/pagination.js';
import * as testimonialService from '../services/testimonial.service.js';

export const getTestimonials = asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query, { defaultLimit: 20 });
  const { items, meta } = await testimonialService.listTestimonials({
    featured: req.query.featured,
    page,
    limit,
    skip,
  });
  ApiResponse.send(res, 200, items, 'Testimonials fetched', meta);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.createTestimonial(req.body);
  ApiResponse.send(res, 201, testimonial, 'Testimonial created');
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.deleteTestimonial(req.params.id);
  ApiResponse.send(res, 200, null, 'Testimonial deleted');
});
