/**
 * @created 16/10/2021 - 11:04
 * @project settings.json
 * @author  Shevan
 * @file    FeedbackData
 */

import { Experiance, FeedbackType } from '@prisma/client';

export const FeedbackDataList = [
  {
    level: Experiance.GOOD,
    feedback:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    type: FeedbackType.SUGGESTION,
  },
  {
    level: Experiance.POOR,
    feedback:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    type: FeedbackType.BUG,
  },
  {
    level: Experiance.AVERAGE,
    feedback:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    type: FeedbackType.OTHER,
  },
];
