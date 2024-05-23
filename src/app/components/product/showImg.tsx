let count = 0;

const showImg = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log('HJhhHHH');
  const nextSlide = count < 4 ? (count += 1) : 1;
  const prevSlide = count > 1 ? (count -= 1) : 5;
  const btn = e.currentTarget as HTMLButtonElement;
  console.log(count);
  if (btn.classList.contains('next')) {
    console.log(nextSlide);
    document.getElementById(`slide-item${count}`)?.classList.add('hidden');
    document.getElementById(`slide-item${nextSlide}`)?.classList.remove('hidden');
    count = nextSlide;
  } else {
    document.getElementById(`slide-item${count}`)?.classList.add('hidden');
    document.getElementById(`slide-item${prevSlide}`)?.classList.remove('hidden');
    count = prevSlide;
  }
};

export default showImg;
