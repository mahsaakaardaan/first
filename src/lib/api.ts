import {
  CategoryType,
  OrderProductsType,
  ProductsType
} from './types';
import api, { api2 } from './apiConfig';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const BASE_URL = 'http://localhost:3335';

export const noCacheHeaderConfig = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export const getUser = async (token: string) => {
  const access_token = (await cookies()).get('access_token')?.value;
  const data = await api.get(`/user/get-user/${token}`, {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${access_token}`
    }
  });

  return data.data;
};

export const getProducts = async (): Promise<ProductsType[]> => {
  const { data } = await api.get('/product', {
    headers: noCacheHeaderConfig
  });
  return data.data;
};

export const getAllStories = async () => {
  const { data } = await api.get('/story');
  return data.data;
};

export const getAllBanners = async () => {
  const { data } = await api.get('/banner');
  return data.data;
};

export const getStoryById = async (story_id: string) => {
  const { data } = await api.get(`/story/${story_id}`);
  return data.data;
};

export const getAllBlogs = async () => {
  const { data } = await api.get('/blog');
  return data.data;
};

export const getBlogById = async (blog_id: string) => {
  const { data } = await api.get(`/blog/${blog_id}`);
  return data.data[0];
};

export const getIncredibleProducts = async () => {
  const { data } = await api.get(`/product/incredible`);
  return data.data;
};

export const getProductById = async (
  id: string
): Promise<ProductsType> => {
  const { data } = await api.get(`/product/single/${id}`, {
    headers: noCacheHeaderConfig
  });

  return data.data[0];
};

export const userLogin = async ({
  phone_number,
  password
}: {
  phone_number: string;
  password: string;
}) => {
  const body = {
    phoneNumber: phone_number,
    password
  };
  try {
    const data = await api.post('/auth/login', body);

    // const res = await fetch(`${BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     phoneNumber: phone_number,
    //     password
    //   })
    // });
    // const res2 = await res.json();
    // console.log('first', res2);

    // const cookie = res.headers.get('set-cookie');
    // const cookie = data.headers.get('set-cookie')
    // console.log('first333333',cookie);

    // if (cookie) {
    //   (await await ()).set('access_token', cookie);
    // }
    // redirect('/profile')

    const setCookie = data.headers['set-cookie'];
    if (setCookie && Array.isArray(setCookie)) {
      const rawCookie = setCookie.find((c) =>
        c.startsWith('access_token=')
      );
      if (rawCookie) {
        const tokenMatch = rawCookie.match(/access_token=([^;]+)/);
        const token = tokenMatch ? tokenMatch[1] : null;
        if (token) {
          (await cookies()).set('access_token', token);
        }
      }
    }

    return data.data;
  } catch (err) {
    console.log('first userlogin', err);
  }
};

export const getAllCategories = async (): Promise<CategoryType[]> => {
  const { data } = await api.get('/category', {
    headers: noCacheHeaderConfig
  });

  // const res = await fetch(`${BASE_URL}/category`, {
  //   cache: 'no-store'
  // });
  // const res2 = await res.json();

  return data.data;
};

export const getSearchedProducts = async ({
  query,
  categoryId,
  subCategoryId
}: {
  query?: string;
  categoryId?: string;
  subCategoryId?: string;
}) => {
  const { data } = await api.get('/product/search', {
    params: {
      s: query,
      categoryId,
      subCategoryId
    }
  });

  return data.data;
};

export const getUserAddresses = async () => {
  const token = (await cookies()).get('access_token')?.value;
  const { data } = await api.get(`/user/addresses`, {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${token}`
    }
  });

  return data.data;
};

export const addNewAddress = async (body: any) => {
  const token = (await cookies()).get('access_token')?.value;

  const { data } = await api.post('/user/address/new', body, {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${token}`
    }
  });
  return data;
};

export const getAddressById = async ({
  address_id
}: {
  address_id: string;
}) => {
  const token = (await cookies()).get('access_token')?.value;
  const { data } = await api.get(`/user/address/${address_id}`, {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${token}`
    }
  });

  return data.data;
};

export const updateAddress = async ({
  address_id,
  body
}: {
  address_id: string;
  body: any;
}) => {
  const token = (await cookies()).get('access_token')?.value;
  const data = await api.patch(
    `/user/address/update/${address_id}`,
    body,
    {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    }
  );

  return data;
};

export const deleteAddress = async (address_id: string) => {
  const token = (await cookies()).get('access_token')?.value;
  const data = await api.delete(
    `/user/address/delete/${address_id}`,
    {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    }
  );
  return data;
};

export const setDefaultAddress = async (address_id: string) => {
  try {
    const token = (await cookies()).get('access_token')?.value;
    const body = { address_id };
    const data = await api.post('/user/address/set-default', body, {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    });
    return data;
  } catch (error) {
    console.log('first', error);
  }
};

export const updateProfile = async ({ body }: { body: any }) => {
  const token = (await cookies()).get('access_token')?.value;
  const res = await api.patch('/user/update', body, {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${token}`
    }
  });
  return res;
};

export const addToCard = async (body: any) => {
  try {
    const token = (await cookies()).get('access_token')?.value;
    const res = await api.post('/shipment/add-to-card', body, {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    });

    return res;
  } catch (error) {
    console.log('first errrrrrrrrr', error);
  }
};

export const getOrders = async () => {
  const token = (await cookies()).get('access_token')?.value;
  const { data } = await api.get('/shipment/current-orders', {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${token}`
    }
  });
  return data.data;
};

export const deleteCurrentOrderById = async (
  current_order_id: string
) => {
  const token = (await cookies()).get('access_token')?.value;
  const data = await api.delete(
    `/shipment/delete-current-order/${current_order_id}`,
    {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    }
  );
  return data;
};

export const countCurrentOrder = async (
  current_order_id: string,
  quantity: number
) => {
  try {
    const token = (await cookies()).get('access_token')?.value;
    const body = { current_order_id, quantity };
    const data = await api.patch('/shipment/count', body, {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    });

    return data.data;
  } catch (error: any) {
    console.log(
      'first',
      error.response?.status,
      error.response?.data,
      error.message
    );
  }
};

export const submitOrder = async (body: OrderProductsType) => {
  try {
    const token = (await cookies()).get('access_token')?.value;
    const data = await api.post('/shipment/submit-order', body, {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    });
    return data.data;
  } catch (error: any) {
    console.log(
      'first errorrrrr',
      error.response?.status,
      error.response?.data,
      error.message
    );
    if (error.response?.data?.redirectTo) {
      redirect(error.response?.data?.redirectTo);
    }
  }
};

export const getAllOrders = async (status = 'pending') => {
  try {
    const token = (await cookies()).get('access_token')?.value;
    const { data } = await api.get(
      `/shipment/get-all-orders?status=${status}`,
      {
        withCredentials: true,
        headers: {
          ...noCacheHeaderConfig,
          Cookie: `access_token=${token}`
        }
      }
    );
    return data.data;
  } catch (error: any) {
    console.log(
      'pppppppp',
      error.response?.status,
      error.response?.data,
      error.message
    );
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const token = (await cookies()).get('access_token')?.value;
    const { data } = await api.get(`/shipment/order/${orderId}`, {
      withCredentials: true,
      headers: {
        ...noCacheHeaderConfig,
        Cookie: `access_token=${token}`
      }
    });
    return data.data;
  } catch (error: any) {
    console.log(
      'pppppppp',
      error.response?.status,
      error.response?.data,
      error.message
    );
  }
};

export const getMyComments = async () => {
  const token = (await cookies()).get('access_token')?.value;
  const { data } = await api.get('/comment/get-by-user', {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${token}`
    }
  });
  return data.data;
};

export const getProductComments = async (product_id: string) => {
  const { data } = await api.get(`/comment/${product_id}`);
  return data.data;
};

export const addComment = async (body: any) => {
  const token = (await cookies()).get('access_token')?.value;
  const { data } = await api.post('/comment/add-comment', body, {
    withCredentials: true,
    headers: {
      ...noCacheHeaderConfig,
      Cookie: `access_token=${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

// export const getSearchedProducts = async ({
//   // query,
//   categoryId
// }: // subCategoryId
// {
//   // query: string;
//   categoryId: string;
//   // subCategoryId: string;
// }): Promise<ProductsType[]> => {
//   const params = new URLSearchParams({
//     // s: query,
//     categoryId
//     // subCategoryId
//   });
//   const res = await fetch(
//     `${BASE_URL}/product/search?${params.toString()}`,
//     {
//       cache: 'no-store'
//     }
//   );
//   const res2 = await res.json();
//   return res2.data;
// };
