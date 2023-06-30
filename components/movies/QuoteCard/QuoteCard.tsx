import {
  Comment,
  Edit,
  Eye,
  Heart,
  ThreeDots,
  Trash,
} from '@/components/icons';
import Image from 'next/image';
import { useQuoteCard } from './useQuoteCard';
import { useModal } from '@/hooks';
export const QuoteCard = ({ quote, setActiveQuote }: any) => {
  const src = `${process.env.NEXT_PUBLIC_API_URL}/storage/${quote.image}`;
  const { menuOpen, wrapperRef, setMenuOpen, handleDelete } = useQuoteCard();
  const { setOpenModal } = useModal();
  return (
    <div className='bg-singlepost rounded-lg w-full flex flex-col py-6 px-8 gap-6 relative'>
      {menuOpen && (
        <div
          ref={wrapperRef}
          className='flex flex-col gap-8 px-10 py-8 absolute bg-post w-60 rounded-lg top-10 -right-48'
        >
          <div
            onClick={() => {
              setActiveQuote(quote);
              setOpenModal('viewquote');
            }}
            className='flex text-white gap-4 items-center cursor-pointer'
          >
            <Eye />
            <p>View quote</p>
          </div>
          <div
            onClick={() => {
              setActiveQuote(quote);
              setOpenModal('editquote');
            }}
            className='flex text-white gap-4 items-center cursor-pointer'
          >
            <Edit />
            <p>Edit</p>
          </div>
          <div
            onClick={() => handleDelete(Number(quote.id))}
            className='flex text-white gap-4 items-center cursor-pointer'
          >
            <Trash />
            <p>Delete</p>
          </div>
        </div>
      )}
      <div
        className='absolute right-8 top-4 cursor-pointer ThreeDots'
        onClick={() => setMenuOpen(true)}
      >
        <ThreeDots />
      </div>
      <div className='flex items-center'>
        <Image
          width={226}
          loader={() => src}
          height={140}
          src={src}
          className='object-cover w-226 h-140'
          alt='quote-image'
        />
        <div className='text-center w-full text-2xl text-gray-300 italic flex items-center justify-center'>
          <h2>{quote.body.en}</h2>
        </div>
      </div>
      <hr></hr>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-3'>
          <p className='text-white text-xl'>3</p>
          <Comment />
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-white text-xl'>3</p>
          <Heart />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
