import { EquipmentRequest } from '../types/equipment-request';

export const validateEquipmentRequest = {
  categoryId: (val: string) => {
    const categories = ['laptops', 'monitors', 'keyboards', 'software licenses', 'accessories'];
    if (!categories.includes(val)) {
      return 'Please select a valid category.';
    }
    return undefined;
  },
  description: (val: string) => {
    if (!val.trim()) {
      return 'Description is required.';
    }
    if (val.length > 5000) {
      return 'Description must not exceed 5000 characters.';
    }
    return undefined;
  },
};
