import Link from "next/link";
import { MdOutlineRemoveRedEye, MdCheck, MdClose } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type LandInfo = {
  id: string;
  title: string;
  slug: string;
};

type HouseInfo = {
  id: string;
  title: string;
  slug: string;
};

type ReviewType = {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isVerified: boolean;
  landId: string | null;
  houseId: string | null;
  createdAt: string;
  updatedAt: string;
  land: LandInfo | null;
  house: HouseInfo | null;
};

interface ReviewTableRowProps {
  review: ReviewType;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReviewTableRow: React.FC<ReviewTableRowProps> = ({
  review,
  onApprove,
  onReject,
  onDelete,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[status as keyof typeof statusClasses] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const getPropertyInfo = (review: ReviewType) => {
    if (review.land) {
      return {
        type: "Land",
        title: review.land.title,
        id: review.land.id,
        slug: review.land.slug,
      };
    } else if (review.house) {
      return {
        type: "House",
        title: review.house.title,
        id: review.house.id,
        slug: review.house.slug,
      };
    }
    return {
      type: "Unknown",
      title: "Property not found",
      id: "",
      slug: "",
    };
  };

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const propertyInfo = getPropertyInfo(review);

  return (
    <tr className="even:bg-white odd:bg-[#F2F2F2] border-b">
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-[#4A5568]">{review.name}</p>
          <p className="text-sm text-gray-500">{review.email}</p>
        </div>
      </td>

      <td className="px-4 py-3">
        <div>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${
              propertyInfo.type === "Land"
                ? "bg-green-100 text-green-800"
                : propertyInfo.type === "House"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {propertyInfo.type}
          </span>
          <p className="text-sm text-[#4A5568]">
            {truncateText(propertyInfo.title, 4)}
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
          <span className="text-sm text-gray-600 ml-1">({review.rating})</span>
        </div>
      </td>

      <td className="px-4 py-3">
        <p className="text-sm text-[#4A5568] max-w-[200px]">
          {truncateText(review.comment, 10)}
        </p>
      </td>

      <td className="px-4 py-3">{getStatusBadge(review.status)}</td>

      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            review.isVerified
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {review.isVerified ? "Verified" : "Unverified"}
        </span>
      </td>

      <td className="px-4 py-3">
        <p className="text-sm text-[#4A5568]">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link href={`/admin/reviews/${review.id}`}>
            <MdOutlineRemoveRedEye className="h-5 w-5 text-purple-400 hover:text-purple-300 cursor-pointer" />
          </Link>

          {review.status === "PENDING" && (
            <>
              <button
                onClick={() => onApprove(review.id)}
                title="Approve Review"
              >
                <MdCheck className="h-5 w-5 text-green-400 hover:text-green-300 cursor-pointer" />
              </button>
              <button onClick={() => onReject(review.id)} title="Reject Review">
                <MdClose className="h-5 w-5 text-orange-400 hover:text-orange-300 cursor-pointer" />
              </button>
            </>
          )}

          <button onClick={() => onDelete(review.id)} title="Delete Review">
            <RiDeleteBin5Line className="h-5 w-5 text-red-400 hover:text-red-300 cursor-pointer" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ReviewTableRow;
