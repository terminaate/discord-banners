import { $api } from '@/http';
import { AvatarDecoration } from '@/types/AvatarDecoration';

export class AvatarDecorationsService {
  static async getAll() {
    try {
      const { data } = await $api.get<AvatarDecoration[]>('/decorations');
      return data;
    } catch (e) {
      return [];
    }
  }
}
