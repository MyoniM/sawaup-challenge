import { Course } from "@/domain/models";
import { FavoriteParams } from "@/domain/usecases";
import { FavoriteCourses } from "@/infrastructure/services/coursesStorage";
import { asyncMiddleware } from "@/infrastructure/services/middleware/asyncHandler";
import type { NextApiRequest, NextApiResponse } from "next";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MyCustomRequest = Override<
  NextApiRequest,
  { body: FavoriteParams }
>;
async function handler(
  req: MyCustomRequest,
  res: NextApiResponse<Course | null>
) {
  if (req.method == "PUT") {
    const favoriteCourses = new FavoriteCourses();
    return res.status(200).send(await favoriteCourses.favorite(req.body));
  }

  return res.status(405).send(null);
}

export default asyncMiddleware(handler);
