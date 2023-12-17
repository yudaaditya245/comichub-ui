import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({ score = 100 }) {
  const maxScore = 100;
  const numberOfStars = 5;

  const calculateStars = () => {
    const filledStars = Math.floor((score / maxScore) * numberOfStars);
    const hasHalfStar = score % maxScore >= maxScore / (numberOfStars * 2);

    return { filledStars, hasHalfStar };
  };

  const { filledStars, hasHalfStar } = calculateStars();

  return (
    <div className="flex items-center pb-1">
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={index} className="text-amber-500" />
      ))}

      {hasHalfStar && <FaStarHalfAlt className="text-amber-500" />}

      {[...Array(numberOfStars - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FaRegStar key={index} className="text-amber-500" />
      ))}
    </div>
  );
}
