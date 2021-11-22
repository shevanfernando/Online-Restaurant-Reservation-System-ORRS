/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    pagination.dto
 */
import { BeverageType, Experiance, FeedbackType, FoodType } from '@prisma/client';

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
    foodType: FoodType;
    victualId: number;
    Victual: {
      victualId: number;
      name: string;
      description: string;
      price: number;
      imagePath: string | null;
    };
  }[];
};

export type beveragePaginationDTO = {
  pagination: pageDTO;
  data: {
    beverageType: BeverageType;
    victualId: number;
    Victual: {
      victualId: number;
      name: string;
      description: string;
      price: number;
      imagePath: string | null;
    };
  }[];
};

export type feedbackPaginationDTO = {
  pagination: pageDTO;
  data: {
    level: Experiance;
    feedback: string;
    type: FeedbackType;
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
