import { Course } from '@/domain/models';
import { FavoriteCourse as IFavoriteCourse, FavoriteParams } from '@/domain/usecases';

export class RemoteFavoriteCourse implements IFavoriteCourse {
  async favorite(params: FavoriteParams): Promise<Course> {
    const res = await fetch('/api/course/favorite', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return await res.json();
  }
}
