/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    pagination.dto
 */

import { beverage_type, experiance, feedback_type, food_type } from '@prisma/client';

type pageDTO = {
  total_rec: number | null;
  per_page: number | null;
  current_page: number | null;
  previous_page: number | null;
  next_page: number | null;
  total_pages: number | null;
  from: number | null;
  to: number | null;
};

export type foodPaginationDTO = {
  pagination: pageDTO;
  data: {
    food_type: food_type;
    victual_id: number;
    victual: {
      id: number;
      name: string;
      description: string;
      price: number;
      image_path: string | null;
    };
  }[];
};

export type beveragePaginationDTO = {
  pagination: pageDTO;
  data: {
    beverage_type: beverage_type;
    victual_id: number;
    victual: {
      id: number;
      name: string;
      description: string;
      price: number;
      image_path: string | null;
    };
  }[];
};

export type feedbackPaginationDTO = {
  pagination: pageDTO;
  data: {
    level: experiance;
    feedback: string;
    type: feedback_type;
  }[];
};

export const paginationFunc = (data: {
  total_rec: number;
  per_page: number;
  cr_num_data: number;
  page_no: number;
}): pageDTO => {
  const start = (data.page_no - 1) * data.per_page;
  const total_pages = data.total_rec / data.per_page;
  return {
    total_rec: data.total_rec,
    per_page: data.per_page,
    current_page: data.page_no,
    previous_page: data.page_no - 1 === 0 ? null : data.page_no - 1,
    next_page: total_pages > 1 && total_pages !== data.page_no ? data.page_no + 1 : null,
    total_pages: total_pages > 1 ? Math.round(total_pages) : 1,
    from: start === 0 ? 1 : start,
    to: start + data.cr_num_data,
  };
};
