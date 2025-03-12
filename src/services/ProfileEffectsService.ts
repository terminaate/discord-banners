import { ProfileEffect } from '@/types/ProfileEffect';
import { $api } from '@/http';

export class ProfileEffectsService {
  static async getAll() {
    try {
      const { data } = await $api.get<ProfileEffect[]>('/profile-effects');
      return Object.values(data);
    } catch (e) {
      return [];
    }
  }
}
