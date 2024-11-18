import { useEffect, useState } from "react";
import { BookLevelComponent } from "../../interface";

const BookLevel = (props: BookLevelComponent) => {
  const { old, medium, good, new: latest } = props.book_type
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [clickTime, setClickTime] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (latest.quantity > 0) {
      setActiveIndex(0)
      props.onClick(0, 0)
      return;
    }
    if (good.quantity > 0) {
      setActiveIndex(1)
      props.onClick(1, 0)
      return;
    }
    if (medium.quantity > 0) {
      setActiveIndex(2)
      props.onClick(2, 0)
      return;
    }
    if (old.quantity > 0) {
      setActiveIndex(3)
      props.onClick(3, 0)
      return;
    }
  }, [props.book_type])

  const handleClick = async (index: number) => {
    // Use functional state update to ensure the latest state
    setClickTime((prevClickTime) => {
      const newClickTime = prevClickTime + 1;
      return newClickTime;
    });

    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }

    // Pass the updated clickTime to the parent by incrementing in the callback
    setClickTime((prevClickTime) => {
      const updatedClickTime = prevClickTime + 1;
      props.onClick(index, updatedClickTime);
      return updatedClickTime;
    });
  };

  return (
    <div className={`grid ${!isMobile ? "grid-cols-2" : "grid-cols-4"} w-fit justify-center text-[20px] gap-[10px]`}>
      {
        latest.quantity > 0 && (
          <div
            className={`cursor-pointer flex flex-col align-middle col-span-1 justify-center min-w-[120px]`}
            onClick={() => handleClick(0)}
          >
            <div className={`hover:bg-[#9BC3FF] py-[5px] ${activeIndex === 0 ? "bg-neon" : ""}`}>
              <div className="text-[18px] text-center">mới ({latest.quantity})</div>
              <div className="text-[18px] text-center mt-[5px]">{latest.price ? `${latest.price.toLocaleString()}đ` : ""}</div>
            </div>
          </div>
        )
      }
      {
        good.quantity > 0 && (
          <div
            className={`cursor-pointer flex flex-col align-middle col-span-1 justify-center min-w-[120px] `}
            onClick={() => handleClick(1)}
          >
            <div className={`hover:bg-[#9BC3FF] py-[5px] ${activeIndex === 1 ? "bg-neon" : ""}`}>
              <div className="text-[18px] text-center">đẹp ({good.quantity})</div>
              <div className="text-[18px] text-center  mt-[5px]">{good.price ? `${good.price.toLocaleString()}đ` : ""}</div>
            </div>
          </div>
        )
      }
      {
        medium.quantity > 0 && (
          <div
            className={`cursor-pointer flex flex-col align-middle col-span-1 justify-center min-w-[120px]`}
            onClick={() => handleClick(2)}
          >
            <div className={`hover:bg-[#9BC3FF] py-[5px] ${activeIndex === 2 ? "bg-neon" : ""}`}>
              <div className="text-[18px] text-center">khá ({medium.quantity})</div>
              <div className="text-[18px] text-center  mt-[5px]">{medium.price ? `${medium.price.toLocaleString()}đ` : ""}</div>
            </div>
          </div>
        )
      }
      {
        old.quantity > 0 && (
          <div
            className={`cursor-pointer flex flex-col align-middle col-span-1 justify-center min-w-[120px]`}
            onClick={() => handleClick(3)}
          >
            <div className={`hover:bg-[#9BC3FF] py-[5px] ${activeIndex === 3 ? "bg-neon" : ""}`}>
              <div className="text-[18px] text-center">tạm ({old.quantity})</div>
              <div className="text-[18px] text-center  mt-[5px]">{old.price ? `${old.price.toLocaleString()}đ` : ""}</div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default BookLevel;
