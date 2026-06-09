import pb from './pocketbase';

export const getProducts = async (category?: string) => {
  try {
    const filter = category ? `category = "${category}"` : '';
    return await pb.collection('products').getFullList({
      filter,
      sort: '-created',
    });
  } catch (error) {
    console.error('PB Fetch Error:', error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    return await pb.collection('products').getOne(id);
  } catch (error) {
    console.error('PB Fetch One Error:', error);
    return null;
  }
};

export const getActiveCollections = async () => {
  try {
    return await pb.collection('collections').getFullList({
      filter: 'is_active = true',
    });
  } catch (error) {
    console.error('PB Collections Error:', error);
    return [];
  }
};
