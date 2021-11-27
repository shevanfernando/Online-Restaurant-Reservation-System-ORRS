/**
 * @created 16/10/2021 - 11:04
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    FeedbackData
 */

import { experiance, feedback_type } from '@prisma/client';

export const FeedbackDataList = [
  {
    level: experiance.GOOD,
    feedback:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    type: feedback_type.SUGGESTION,
  },
  {
    level: experiance.POOR,
    feedback:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    type: feedback_type.BUG,
  },
  {
    level: experiance.AVERAGE,
    feedback:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    type: feedback_type.OTHER,
  },
];
