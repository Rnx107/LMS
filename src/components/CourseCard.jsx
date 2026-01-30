// src/components/CourseCard.jsx
const CourseCard = ({
  title,
  description,
  price,
  image,
  level,
  author,
}) => {
  return (
    <div className="bg-[#1f2937] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 text-white">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>

        {/* Author + Level */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-600" />
            <span className="text-sm text-gray-300">{author}</span>
          </div>

          <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">
            {level}
          </span>
        </div>

        {/* Price */}
        <div className="text-lg font-bold">₹{price}</div>
      </div>
    </div>
  );
};

export default CourseCard;
