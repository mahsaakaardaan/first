import Nav from '@/component/general/Nav';
import ProductCard from '@/component/general/ProductCard';
import Story from '@/component/general/Story';
import {
  getAllBanners,
  getAllStories,
  getIncredibleProducts,
  getProducts
} from '@/lib/api';
import Slider from '@/component/general/Slider';

const Home = async () => {
  const products = await getProducts();
  const incredible = await getIncredibleProducts();
  const stories = await getAllStories();
  const banners = await getAllBanners();

  return (
    <div className="w-full">
      <Nav />
      <div className="flex overflow-x-scroll gap-2 my-4 mr-4">
        {stories.map((i: any, index: number) => (
          <Story key={index} data={i} />
        ))}
      </div>
      <Slider slides={banners} interval={4000} />
      <div className="w-full my-6 bg-main-green h-[30vh] flex overflow-x-scroll gap-2 items-center px-6">
        <div className="min-w-[100px] max-w-[100px] h-[25vh] line-clamp-2 flex items-center justify-center text-2xl text-white">
          شگفت انگیز ٪
        </div>
        {incredible.map((item: any, index: any) => (
          <ProductCard key={index} data={item} isFirst={index == 0} />
        ))}
      </div>
      <div className="bg-semi-green p-2 mt-6">
        <h1 className="mb-4 text-2xl">محصولات ویژه</h1>
        <div className="w-full grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 gap-2 place-items-center ">
          {products.map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
